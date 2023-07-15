import { StatusCodes } from "http-status-codes";
import { Types } from "mongoose";
import { RequestHandler } from "express";
import * as userServices from "./user.services";
import { sendResponse } from "../../../shared/send_response";
import IUser from "./user.interfaces";
import { catchAsync } from "../../../shared/catch_async";
import { userFilterableFields } from "./user.constants";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../statics/pagination.static";
import ApiError from "../../../errors/api_error";

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

export const getAUsersController: RequestHandler = catchAsync(
  async (req, res) => {
    const userId = new Types.ObjectId(req.params.id);
    const result = await userServices.getAUserByIdService(userId);
    sendResponse<IUser>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User responsed!",
      data: result,
    });
  }
);
export const updateAUsersController: RequestHandler = catchAsync(
  async (req, res) => {
    const userId = new Types.ObjectId(req.params.id);
    const isUserExist = await userServices.getAUserByIdService(userId);
    if (!isUserExist) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid user id");
    }
    const result = await userServices.updateAUserByIdService(userId, req.body);
    sendResponse<Partial<IUser>>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User updated successfully!",
      data: result,
    });
  }
);
export const deleteAUsersController: RequestHandler = catchAsync(
  async (req, res) => {
    const userId = new Types.ObjectId(req.params.id);
    const isUserExist = await userServices.getAUserByIdService(userId);
    if (!isUserExist) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid user id");
    }
    const result = await userServices.deleteAUserByIdService(userId);
    sendResponse<Partial<IUser>>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "User deleted successfully!",
      data: result,
    });
  }
);
