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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const user_services_1 = require("../user/user.services");
const api_error_1 = __importDefault(require("../../../errors/api_error"));
const http_status_codes_1 = require("http-status-codes");
const cowSchema = new mongoose_1.default.Schema({
    name: String,
    age: Number,
    price: Number,
    location: {
        type: String,
        enum: [
            "Dhaka",
            "Chattogram",
            "Barishal",
            "Rajshahi",
            "Sylhet",
            "Comilla",
            "Rangpur",
            "Mymensingh",
        ],
        required: true,
    },
    breed: String,
    weight: Number,
    label: { type: String, enum: ["for sale", "sold out"], required: true },
    category: {
        type: String,
        enum: ["Dairy", "Beef", "DualPurpose"],
        required: true,
    },
    seller: mongoose_1.Schema.Types.ObjectId,
}, {
    timestamps: true,
});
cowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isSellerExist = yield (0, user_services_1.getAUserByIdService)(this.seller);
        if (!isSellerExist || isSellerExist.role !== "seller") {
            const err = new api_error_1.default(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, "Please provide a valid seller id!");
            next(err);
        }
        next();
    });
});
const Cow = mongoose_1.default.model("Cow", cowSchema);
exports.default = Cow;
