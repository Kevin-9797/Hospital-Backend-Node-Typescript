"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models/");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    debug: true
});
const server = new models_1.Server();
server.listen();
//# sourceMappingURL=app.js.map