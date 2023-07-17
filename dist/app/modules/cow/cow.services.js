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
exports.deleteACowByIdService = exports.updateACowByIdService = exports.getACowByIdService = exports.getAllCowService = exports.createNewCowService = void 0;
const whereconditions_1 = require("../../../shared/whereconditions");
const cow_constants_1 = require("./cow.constants");
const cow_model_1 = __importDefault(require("./cow.model"));
const createNewCowService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.create(payload);
    return result;
});
exports.createNewCowService = createNewCowService;
const getAllCowService = (filters, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const conditions = (0, whereconditions_1.filtersAndSearchControll)(filters, cow_constants_1.cowSearchableFields);
    const { sort, limit, page, skip } = (0, whereconditions_1.paginationControll)(pagination);
    const data = yield cow_model_1.default.find(conditions).sort(sort).skip(skip).limit(limit);
    const count = yield cow_model_1.default.countDocuments(conditions);
    return {
        meta: {
            limit,
            page,
            count,
        },
        data,
    };
});
exports.getAllCowService = getAllCowService;
const getACowByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findOne({ _id: id });
    return result;
});
exports.getACowByIdService = getACowByIdService;
const updateACowByIdService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findByIdAndUpdate(id, { $set: payload }, { new: true });
    return result;
});
exports.updateACowByIdService = updateACowByIdService;
const deleteACowByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.deleteACowByIdService = deleteACowByIdService;
