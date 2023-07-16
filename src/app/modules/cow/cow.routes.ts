import express from "express";
import * as cowController from "./cow.controller";
import { validateRequest } from "../../../middlewares/validate_request";
import { cowZodSchema, updateCowZodSchema } from "./cow.validator";

const router = express.Router();

router.post(
  "/",
  validateRequest(cowZodSchema),
  cowController.createNewCowController
);

router.get("/", cowController.getAllCowController);
router.patch(
  "/:id",
  validateRequest(updateCowZodSchema),
  cowController.updateACowController
);

export const cowRoutes = router;
