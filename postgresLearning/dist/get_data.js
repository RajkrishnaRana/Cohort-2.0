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
const utils_1 = require("./utils");
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, utils_1.getClient)();
        const query = "SELECT * FROM users";
        const result = yield client.query(query);
        console.log("Users : ");
        for (const user of result.rows) {
            console.log(`ID : ${user.id} Email : ${user.email}`);
        }
    });
}
function getUserFromEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, utils_1.getClient)();
        const query = "SELECT * FROM users WHERE email = $1";
        const result = yield client.query(query, [email]);
        console.log("Single User Details : ");
        for (const user of result.rows) {
            console.log(`ID : ${user.id} Email : ${user.email}`);
        }
    });
}
function getTodosForUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, utils_1.getClient)();
        const query = "SELECT * FROM todos WHERE user_id = $1";
        const result = yield client.query(query, [userId]);
        console.log("Todos : ");
        for (const todo of result.rows) {
            console.log(`ID : ${todo.id} Title : ${todo.title} Description : ${todo.description}`);
        }
    });
}
getTodosForUser(3);
