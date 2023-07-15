"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    res.status(data.statusCode).send({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || undefined,
        meta: data.meta || undefined,
        data: data.data || undefined,
    });
};
exports.sendResponse = sendResponse;
