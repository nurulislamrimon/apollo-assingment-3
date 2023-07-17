"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../app/modules/user/auth.routes");
const cow_routes_1 = require("../app/modules/cow/cow.routes");
const user_routes_1 = require("../app/modules/user/user.routes");
const order_routes_1 = require("../app/modules/order/order.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        module: auth_routes_1.authRoutes,
    },
    {
        path: "/users",
        module: user_routes_1.userRoutes,
    },
    {
        path: "/cows",
        module: cow_routes_1.cowRoutes,
    },
    {
        path: "/order",
        module: order_routes_1.orderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.module));
exports.default = router;
