"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: process.cwd() + "/.env" });
const config = {
    port: process.env.port,
    db_local: process.env.db_local,
    db_remote: process.env.db_remote,
    env: process.env.NODE_ENV,
};
exports.default = config;
