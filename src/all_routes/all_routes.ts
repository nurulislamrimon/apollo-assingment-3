import express from "express";
import { authRoutes } from "../app/modules/user/auth.routes";
import { cowRoutes } from "../app/modules/cow/cow.routes";
import { userRoutes } from "../app/modules/user/user.routes";
import { orderRoutes } from "../app/modules/order/order.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    module: authRoutes,
  },
  {
    path: "/users",
    module: userRoutes,
  },
  {
    path: "/cows",
    module: cowRoutes,
  },
  {
    path: "/order",
    module: orderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.module));

export default router;
