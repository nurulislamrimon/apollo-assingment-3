"use strict";
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
exports.getAllCowService = exports.createNewCowService = exports.updateSellerAccount = exports.updateBuyerAccount = void 0;
const uniqid_1 = __importDefault(require("uniqid"));
const order_model_1 = __importDefault(require("./order.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const updateBuyerAccount = (id, newBudget, session) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndUpdate(id, { $set: { budget: newBudget } }, { session });
    return result;
});
exports.updateBuyerAccount = updateBuyerAccount;
const updateSellerAccount = (id, cowPrice, session) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndUpdate(id, { $set: { income: cowPrice } }, { session });
    return result;
});
exports.updateSellerAccount = updateSellerAccount;
const createNewCowService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const trxId = (0, uniqid_1.default)();
    payload.trxId = trxId;
    const result = yield order_model_1.default.create(payload);
    return result;
});
exports.createNewCowService = createNewCowService;
const getAllCowService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({});
    return result;
});
exports.getAllCowService = getAllCowService;
