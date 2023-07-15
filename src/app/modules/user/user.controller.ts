import { RequestHandler } from "express";
import * as userServices from "./user.services";
import { sendResponse } from "../../../shared/send_response";
import { StatusCodes } from "http-status-codes";
import IUser from "./user.interfaces";
import { catchAsync } from "../../../shared/catch_async";
import { userFilterableFields } from "./user.constants";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../statics/pagination.static";

export const getAllUsersController: RequestHandler = catchAsync(
  async (req, res) => {
    const filters = pick(req.query, userFilterableFields);
    const pagination = pick(req.query, paginationFields);

    const result = await userServices.getAllUsersService(filters, pagination);

    sendResponse<IUser[]>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User's",
      meta: result.meta,
      data: result.user,
    });
  }
);
export const createNewUserController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await userServices.createNewUserService(req.body);

    sendResponse<IUser>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Users created successfully",
      data: result,
    });
  }
);
