"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const otp = {};
app.post("/getOTP", (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }
    const generatedOTP = Math.floor(100000 + Math.random() * 200000).toString();
    console.log("The OTP generated is ", generatedOTP);
    otp[email] = generatedOTP;
    res.json({ message: "OTP sent successfully" });
});
app.post("/verifyOTP", (req, res) => {
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
