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
exports.getAUserByIdService = exports.createNewUserService = exports.getAllUsersService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const user_constants_1 = require("./user.constants");
const whereconditions_1 = require("../../../shared/whereconditions");
const getAllUsersService = (filters, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const conditions = (0, whereconditions_1.filtersAndSearchControll)(filters, user_constants_1.userSearchableFields);
    const { sort, limit, page, skip } = (0, whereconditions_1.paginationControll)(pagination);
    const user = yield user_model_1.default.find(conditions).sort(sort).skip(skip).limit(limit);
    const totalDocuments = yield user_model_1.default.countDocuments(conditions);
    return {
        meta: {
            limit,
            page,
            totalDocuments,
        },
        user,
    };
});
exports.getAllUsersService = getAllUsersService;
const createNewUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(payload);
    return result;
});
exports.createNewUserService = createNewUserService;
const getAUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ _id: id });
    return result;
});
exports.getAUserByIdService = getAUserByIdService;
