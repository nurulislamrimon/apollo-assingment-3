"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = __importDefault(require("../config/env_config"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let errorMessages;
    res.status(statusCode).send({
        success: false,
        message: error.message,
        errorMessages,
        stack: env_config_1.default.env !== "development" ? "" : error.stack,
    });
};
exports.default = globalErrorHandler;
