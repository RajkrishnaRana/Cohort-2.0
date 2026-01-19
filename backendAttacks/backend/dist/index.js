"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const otpLimiter = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000, // 15 minutes
    limit: 3,
    message: "Too many requests, please try again after 5 minutes",
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});
const passLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: "Too many password reset attempts, please try again after 15 minutes",
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});
const otp = {};
app.post("/getOTP", otpLimiter, (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    const generatedOTP = Math.floor(100000 + Math.random() * 100000).toString();
    console.log("The OTP generated is ", generatedOTP);
    otp[email] = generatedOTP;
    res.json({ message: "OTP sent successfully" });
});
app.post("/verifyOTP", passLimiter, (req, res) => {
    const { email, userOTP } = req.body;
    if (!email || !userOTP) {
        return res.status(400).json({ error: "Email and OTP are required" });
    }
    if (userOTP !== otp[email]) {
        return res.status(400).json({ error: "Invalid OTP" });
    }
    console.log("OTP verified successfully, and your pass reset");
    res.json({ message: "OTP verified successfully, and your pass reset" });
});
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
