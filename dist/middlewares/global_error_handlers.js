"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = __importDefault(require("../config/env_config"));
const handle_validation_error_1 = require("../errors/handle_validation_error");
const api_error_1 = __importDefault(require("../errors/api_error"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message;
    let errorMessages;
    if (error.name === "ValidationError") {
        const validationError = (0, handle_validation_error_1.handleValidationError)(error);
        statusCode = validationError.statusCode;
        message = validationError.message;
        errorMessages = validationError.errorMessages;
    }
    else if (error instanceof api_error_1.default) {
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = [
            {
                path: "",
                message: error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorMessages = [
            {
                path: "",
                message: error.message,
            },
        ];
    }
    res.status(statusCode).send({
        success: false,
        message,
        errorMessages,
        stack: env_config_1.default.env !== "development" ? undefined : error.stack,
    });
};
exports.default = globalErrorHandler;
