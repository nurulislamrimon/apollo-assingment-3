"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateZodSchema = exports.userZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string({
            required_error: "Password is required!",
        }),
        role: zod_1.default.string({
            required_error: "Role is required!",
        }),
        name: zod_1.default.object({
            firstName: zod_1.default.string({
                required_error: "First name is required!",
            }),
            lastName: zod_1.default.string().optional(),
        }),
        phoneNumber: zod_1.default.string({
            required_error: "Phone number is required!",
        }),
        address: zod_1.default.string({
            required_error: "Address is required!",
        }),
        budget: zod_1.default.number().optional(),
        income: zod_1.default.number().optional(),
    }),
});
exports.userUpdateZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string().optional(),
        role: zod_1.default.string().optional(),
        name: zod_1.default.object({
            firstName: zod_1.default.string().optional(),
            lastName: zod_1.default.string().optional(),
        }),
        phoneNumber: zod_1.default.string().optional(),
        address: zod_1.default.string().optional(),
        budget: zod_1.default.number().optional(),
        income: zod_1.default.number().optional(),
    }),
});
