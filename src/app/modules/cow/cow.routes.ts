import express from "express";
import * as cowController from "./cow.controller";
import { validateRequest } from "../../../middlewares/validate_request";
import { cowZodSchema, updateCowZodSchema } from "./cow.validator";

const router = express.Router();

router.get("/", cowController.getAllCowController);
router.post(
  "/",
  validateRequest(cowZodSchema),
  cowController.createNewCowController
);

router.get("/:id", cowController.getACowController);
router.patch(
  "/:id",
  validateRequest(updateCowZodSchema),
  cowController.updateACowController
);
router.delete("/:id", cowController.deleteACowController);

export const cowRoutes = router;
