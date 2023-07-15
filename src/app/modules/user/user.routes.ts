import express from "express";
import * as userController from "./user.controller";
import { validateRequest } from "../../../middlewares/validate_request";
import { userZodSchema } from "./user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userZodSchema),
  userController.createNewUserController
);
router.get("/", userController.getAllUsersController);

export const userRoutes = router;
