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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
function processSubmission(submissions) {
    return __awaiter(this, void 0, void 0, function* () {
        const { problemId, code, language } = JSON.parse(submissions);
        console.log(`Processing submission for problem ${problemId}`);
        console.log(`Code ${code}`);
        console.log(`language ${language}`);
        // add processing logic
        //Simulate the processing delays
        yield new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`Finish processing of the problem ${problemId}`);
    });
}
function startWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to Redis client");
            // Main Loop
            while (true) {
                try {
                    const submissions = yield client.brPop("submissions", 0);
                    console.log("Problem submissions", submissions);
                    yield processSubmission(submissions.element);
                }
                catch (error) {
                    console.error("Error processing the submission", error);
                }
            }
        }
        catch (error) {
            console.error("Failed to connect to the Redis", error);
        }
    });
}
startWorker();
