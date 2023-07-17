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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cowController = __importStar(require("./cow.controller"));
const validate_request_1 = require("../../../middlewares/validate_request");
const cow_validator_1 = require("./cow.validator");
const router = express_1.default.Router();
router.get("/", cowController.getAllCowController);
router.post("/", (0, validate_request_1.validateRequest)(cow_validator_1.cowZodSchema), cowController.createNewCowController);
router.get("/:id", cowController.getACowController);
router.patch("/:id", (0, validate_request_1.validateRequest)(cow_validator_1.updateCowZodSchema), cowController.updateACowController);
router.delete("/:id", cowController.deleteACowController);
exports.cowRoutes = router;
