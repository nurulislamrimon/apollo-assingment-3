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
exports.deleteAUsersController = exports.updateAUsersController = exports.getAUsersController = exports.createNewUserController = exports.getAllUsersController = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = require("mongoose");
const userServices = __importStar(require("./user.services"));
const send_response_1 = require("../../../shared/send_response");
const catch_async_1 = require("../../../shared/catch_async");
const user_constants_1 = require("./user.constants");
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_static_1 = require("../../../statics/pagination.static");
const api_error_1 = __importDefault(require("../../../errors/api_error"));
exports.getAllUsersController = (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, user_constants_1.userFilterableFields);
    const pagination = (0, pick_1.default)(req.query, pagination_static_1.paginationFields);
    const result = yield userServices.getAllUsersService(filters, pagination);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User's",
        meta: result.meta,
        data: result.user,
    });
}));
exports.createNewUserController = (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userServices.createNewUserService(req.body);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Users created successfully",
        data: result,
    });
}));
exports.getAUsersController = (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongoose_1.Types.ObjectId(req.params.id);
    const result = yield userServices.getAUserByIdService(userId);
    if (!result) {
        throw new api_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid user id!");
    }
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User responsed!",
        data: result,
    });
}));
exports.updateAUsersController = (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongoose_1.Types.ObjectId(req.params.id);
    const isUserExist = yield userServices.getAUserByIdService(userId);
    if (!isUserExist) {
        throw new api_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid user id");
    }
    const result = yield userServices.updateAUserByIdService(userId, req.body);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User updated successfully!",
        data: result,
    });
}));
exports.deleteAUsersController = (0, catch_async_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = new mongoose_1.Types.ObjectId(req.params.id);
    const isUserExist = yield userServices.getAUserByIdService(userId);
    if (!isUserExist) {
        throw new api_error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid user id");
    }
    const result = yield userServices.deleteAUserByIdService(userId);
    (0, send_response_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User deleted successfully!",
        data: result,
    });
}));
