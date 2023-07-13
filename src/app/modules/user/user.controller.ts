import { RequestHandler } from "express";
import * as userServices from "./user.services";
import { sendResponse } from "../../../shared/send_response";
import { StatusCodes } from "http-status-codes";
import IUser from "./user.interfaces";
import { catchAsync } from "../../../shared/catch_async";

export const createNewUserController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await userServices.createNewUserService(req.body);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
);
