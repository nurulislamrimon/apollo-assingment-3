import express from "express";
import * as userController from "./user.controller";
import { validateRequest } from "../../../middlewares/validate_request";
import { userUpdateZodSchema } from "./user.validation";

const router = express.Router();

router.get("/", userController.getAllUsersController);
router.get("/:id", userController.getAUsersController);
router.patch(
  "/:id",
  validateRequest(userUpdateZodSchema),
  userController.updateAUsersController
);

export const userRoutes = router;
