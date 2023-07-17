import express from "express";
import * as orderController from "./order.controller";
import { validateRequest } from "../../../middlewares/validate_request";
import { orderZodSchema } from "./order.validator";

const router = express.Router();

router.post(
  "/",
  validateRequest(orderZodSchema),
  orderController.createNewOrderController
);

router.get("/", orderController.getAllCowController);

export const orderRoutes = router;
