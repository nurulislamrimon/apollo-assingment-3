"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCowZodSchema = exports.cowZodSchema = void 0;
const zod_1 = require("zod");
const cowLocations = [
    "Dhaka",
    "Chattogram",
    "Barishal",
    "Rajshahi",
    "Sylhet",
    "Comilla",
    "Rangpur",
    "Mymensingh",
];
const cowLabel = ["for sale", "sold out"];
const cowCategory = ["Dairy", "Beef", "DualPurpose"];
exports.cowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Age is required!",
        }),
        age: zod_1.z.number({
            required_error: "Age is required!",
        }),
        price: zod_1.z.number({
            required_error: "Price is required!",
        }),
        location: zod_1.z.enum(cowLocations),
        breed: zod_1.z.string({
            required_error: "Breed is required!",
        }),
        weight: zod_1.z.number({
            required_error: "Weight is required!",
        }),
        label: zod_1.z.enum(cowLabel),
        category: zod_1.z.enum(cowCategory),
        seller: zod_1.z.string({
            required_error: "Seller id is required!",
        }),
    }),
});
exports.updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum(cowLocations).optional(),
        breed: zod_1.z.string().optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.enum(cowLabel).optional(),
        category: zod_1.z.enum(cowCategory).optional(),
        seller: zod_1.z.string().optional(),
    }),
});
