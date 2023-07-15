"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ["buyer", "seller"], required: true },
    password: { type: String, required: true },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    if (this.role !== "buyer") {
        this.budget = 0;
    }
    next();
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
