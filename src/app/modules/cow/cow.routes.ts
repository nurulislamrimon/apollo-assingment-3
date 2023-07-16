import express from "express";
import * as cowController from "./cow.controller";
import { validateRequest } from "../../../middlewares/validate_request";
import { cowZodSchema } from "./cow.validator";

const router = express.Router();

router.post(
  "/",
  validateRequest(cowZodSchema),
  cowController.createNewCowController
);

export const cowRoutes = router;
