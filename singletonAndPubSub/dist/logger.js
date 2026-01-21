"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startLogger = startLogger;
const store_1 = __importDefault(require("./store"));
function startLogger() {
    setInterval(() => store_1.default.getInstance().log(), 5000);
}
