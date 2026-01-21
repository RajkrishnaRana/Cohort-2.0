"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pubSubManager_1 = __importDefault(require("./pubSubManager"));
// startLogger();
// setInterval(() => GameManager.getInstance().addGame(Math.random().toString(), "Alice", "Bob"), 5000);
setInterval(() => pubSubManager_1.default.getInstance().userSubscribe(Math.random().toString(), "AAPL"), 5000);
