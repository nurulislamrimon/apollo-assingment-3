"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const global_error_handlers_1 = __importDefault(require("./middlewares/global_error_handlers"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(global_error_handlers_1.default);
app.use((req, res, next) => {
    res.send({
        success: false,
        message: "Route Not Found!",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API Not Found!",
            },
        ],
    });
});
exports.default = app;
