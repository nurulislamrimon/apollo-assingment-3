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
exports.deleteACowController = exports.updateACowController = exports.getACowController = exports.getAllCowController = exports.createNewCowController = void 0;
const pick_1 = __importDefault(require("../../../shared/pick"));
const cowServices = __importStar(require("./cow.services"));
const send_response_1 = require("../../../shared/send_response");
const http_status_codes_1 = require("http-status-codes");
const catch_async_1 = require("../../../shared/catch_async");
const mongoose_1 = require("mongoose");
const cow_constants_1 = require("./cow.constants");
const api_error_1 = __importDefault(require("../../../errors/api_error"));
exports.createNewCowController = (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sellerId = req.body.seller;
    const seller = new mongoose_1.Types.ObjectId(sellerId.includes("ObjectId") ? sellerId.slice(9, 33) : sellerId);
    req.body.seller = seller;
    const result = yield cowServices.createNewCowService(req.body);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
exports.getAllCowController = (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, cow_constants_1.cowFilterableFields);
    const pagination = (0, pick_1.default)(req.query, cow_constants_1.cowSearchableFields);
    const result = yield cowServices.getAllCowService(filters, pagination);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        meta: result.meta,
        data: result.data,
    });
}));
exports.getACowController = (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cowId = new mongoose_1.Types.ObjectId(req.params.id);
    const result = yield cowServices.getACowByIdService(cowId);
    if (!result) {
        throw new api_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid user id!");
    }
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Cow responsed!",
        data: result,
    });
}));
exports.updateACowController = (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sellerId = req.body.seller;
    const seller = new mongoose_1.Types.ObjectId(sellerId.includes("ObjectId") ? sellerId.slice(9, 33) : sellerId);
    req.body.seller = seller;
    const cowId = new mongoose_1.Types.ObjectId(req.params.id);
    const isCowExist = yield cowServices.getACowByIdService(cowId);
    if (!isCowExist) {
        throw new api_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid cow id");
    }
    const result = yield cowServices.updateACowByIdService(cowId, req.body);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Cow updated successfully!",
        data: result,
    });
}));
exports.deleteACowController = (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cowId = new mongoose_1.Types.ObjectId(req.params.id);
    const isCowExist = yield cowServices.getACowByIdService(cowId);
    if (!isCowExist) {
        throw new api_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid cow id");
    }
    const result = yield cowServices.deleteACowByIdService(cowId);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Cow deleted successfully!",
        data: result,
    });
}));
