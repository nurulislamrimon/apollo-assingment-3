"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importStar(require("express"));
const global_error_handlers_1 = __importDefault(require("./middlewares/global_error_handlers"));
const all_routes_1 = __importDefault(require("./all_routes/all_routes"));
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: true }));
// initial route
app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "Welcome to Cow hat!",
    });
});
// all routes
app.use("/api/v1", all_routes_1.default);
// global error handler
app.use(global_error_handlers_1.default);
// not found route handler
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
