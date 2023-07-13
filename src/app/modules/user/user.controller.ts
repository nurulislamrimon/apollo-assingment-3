import { RequestHandler } from "express";
import * as userServices from "./user.services";
import { sendResponse } from "../../../shared/send_response";
import { StatusCodes } from "http-status-codes";

export const createNewUserController: RequestHandler = (req, res) => {
  const result = userServices.createNewUserService();

  interface result {
    success: boolean;
  }

  sendResponse<result>(res, {
    success: true,
    statusCode: StatusCodes.OK,
    data: result,
  });
};
