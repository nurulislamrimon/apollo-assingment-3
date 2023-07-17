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
exports.getAllCowController = exports.createNewOrderController = void 0;
const orderServices = __importStar(require("./order.services"));
const send_response_1 = require("../../../shared/send_response");
const http_status_codes_1 = require("http-status-codes");
const catch_async_1 = require("../../../shared/catch_async");
const mongoose_1 = __importStar(require("mongoose"));
const user_services_1 = require("../user/user.services");
const cow_services_1 = require("../cow/cow.services");
const api_error_1 = __importDefault(require("../../../errors/api_error"));
exports.createNewOrderController = (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cowId = req.body.cow;
    const cowObjectId = new mongoose_1.Types.ObjectId(cowId.includes("ObjectId") ? cowId.slice(9, 33) : cowId);
    const buyerId = req.body.buyer;
    const buyerObjectId = new mongoose_1.Types.ObjectId(buyerId.includes("ObjectId") ? buyerId.slice(9, 33) : buyerId);
    req.body.cow = cowObjectId;
    req.body.buyer = buyerObjectId;
    const isBuyerExist = yield (0, user_services_1.getAUserByIdService)(buyerObjectId);
    const isCowExist = yield (0, cow_services_1.getACowByIdService)(cowObjectId);
    if (!isBuyerExist || !isCowExist) {
        throw new api_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid Buyer or Cow id!");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const cowPrice = Number(isCowExist.price);
        const newBudget = Number(isBuyerExist.budget) - cowPrice;
        if (newBudget < 0) {
            throw new api_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Insufficient Balance!");
        }
        // update buyer budget
        yield orderServices.updateBuyerAccount(buyerId, newBudget, session);
        // update seller income
        yield orderServices.updateSellerAccount(isCowExist.seller, cowPrice, session);
        req.body.price = cowPrice;
        const result = yield orderServices.createNewCowService(req.body);
        session.commitTransaction();
        session.endSession();
        (0, send_response_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            data: result,
        });
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
}));
exports.getAllCowController = (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orderServices.getAllCowService();
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
