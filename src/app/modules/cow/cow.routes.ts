import express from "express";
import * as cowController from "./cow.controller";

const router = express.Router();

router.post("/", cowController.createNewCowController);

export const cowRoutes = router;
