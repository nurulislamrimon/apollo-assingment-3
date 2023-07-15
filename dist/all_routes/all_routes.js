"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../app/modules/user/user.routes");
const cow_routes_1 = require("../app/modules/cow/cow.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        module: user_routes_1.userRoutes,
    },
    {
        path: "/cow",
        module: cow_routes_1.cowRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.module));
exports.default = router;
