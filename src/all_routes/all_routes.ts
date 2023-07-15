import express from "express";
import { userRoutes } from "../app/modules/user/user.routes";
import { cowRoutes } from "../app/modules/cow/cow.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    module: userRoutes,
  },
  {
    path: "/cow",
    module: cowRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.module));

export default router;
