"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (error) => {
    const errors = Object.values(error.errors).map((el) => {
        return { path: el.path, message: el.message };
    });
    return {
        statusCode: 400,
        message: "Validation Error!",
        errorMessages: errors,
    };
};
exports.handleValidationError = handleValidationError;
