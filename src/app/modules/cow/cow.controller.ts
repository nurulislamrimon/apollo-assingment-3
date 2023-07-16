import pick from "../../../shared/pick";
import { RequestHandler } from "express";
import * as cowServices from "./cow.services";
import { sendResponse } from "../../../shared/send_response";
import { StatusCodes } from "http-status-codes";
import ICow from "./cow.interfaces";
import { catchAsync } from "../../../shared/catch_async";
import { Types } from "mongoose";
import { cowFilterableFields, cowSearchableFields } from "./cow.constants";
import ApiError from "../../../errors/api_error";

export const createNewCowController: RequestHandler = catchAsync(
  async (req, res) => {
    const sellerId = req.body.seller;
    const seller = new Types.ObjectId(
      sellerId.includes("ObjectId") ? sellerId.slice(9, 33) : sellerId
    );
    req.body.seller = seller;
    const result = await cowServices.createNewCowService(req.body);
    sendResponse<ICow>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
);
export const getAllCowController: RequestHandler = catchAsync(
  async (req, res) => {
    const filters = pick(req.query, cowFilterableFields);
    const pagination = pick(req.query, cowSearchableFields);
    const result = await cowServices.getAllCowService(filters, pagination);
    sendResponse<ICow[]>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      meta: result.meta,
      data: result.data,
    });
  }
);

export const getACowController: RequestHandler = catchAsync(
  async (req, res) => {
    const cowId = new Types.ObjectId(req.params.id);
    const result = await cowServices.getACowService(cowId);
    if (!result) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid user id!");
    }
    sendResponse<ICow>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Cow responsed!",
      data: result,
    });
  }
);

export const updateACowController: RequestHandler = catchAsync(
  async (req, res) => {
    const sellerId = req.body.seller;
    const seller = new Types.ObjectId(
      sellerId.includes("ObjectId") ? sellerId.slice(9, 33) : sellerId
    );
    req.body.seller = seller;
    const cowId = new Types.ObjectId(req.params.id);
    const isCowExist = await cowServices.getACowService(cowId);
    if (!isCowExist) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid cow id");
    }
    const result = await cowServices.updateACowByIdService(cowId, req.body);
    sendResponse<Partial<ICow>>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Cow updated successfully!",
      data: result,
    });
  }
);

export const deleteACowController: RequestHandler = catchAsync(
  async (req, res) => {
    const cowId = new Types.ObjectId(req.params.id);
    const isCowExist = await cowServices.getACowService(cowId);
    if (!isCowExist) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid cow id");
    }
    const result = await cowServices.deleteACowByIdService(cowId);
    sendResponse<Partial<ICow>>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Cow deleted successfully!",
      data: result,
    });
  }
);
