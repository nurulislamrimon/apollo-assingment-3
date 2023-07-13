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
// external imports
const mongoose_1 = __importDefault(require("mongoose"));
// internal imports
const app_1 = __importDefault(require("./app"));
const env_config_1 = __importDefault(require("./config/env_config"));
const boostrap = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_config_1.default.db_remote);
        console.log("Database connection successful!");
        app_1.default.listen(env_config_1.default.port, () => {
            console.log(`Example app listening on port ${env_config_1.default.port}`);
        });
    }
    catch (e) {
        console.log(e);
    }
});
boostrap();
