"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderZodSchema = void 0;
const zod_1 = require("zod");
exports.orderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z.string({
            required_error: "Cow required!",
        }),
        buyer: zod_1.z.string({
            required_error: "Buyer is required!",
        }),
    }),
});
exports.default = exports.orderZodSchema;
