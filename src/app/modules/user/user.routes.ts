import express from "express";
import * as userController from "./user.controller";

const router = express.Router();

router.get("/",userController.getAllUsersController)
router.post("/", userController.createNewUserController);

export const userRoutes = router;
