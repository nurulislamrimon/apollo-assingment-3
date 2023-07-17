import { RequestHandler } from "express";
import * as orderServices from "./order.services";
import { sendResponse } from "../../../shared/send_response";
import { StatusCodes } from "http-status-codes";
import IOrder from "./order.interfaces";
import { catchAsync } from "../../../shared/catch_async";
import mongoose, { Types } from "mongoose";
import { getAUserByIdService } from "../user/user.services";
import { getACowByIdService } from "../cow/cow.services";
import ApiError from "../../../errors/api_error";

export const createNewOrderController: RequestHandler = catchAsync(
  async (req, res) => {
    const cowId = req.body.cow;
    const cowObjectId = new Types.ObjectId(
      cowId.includes("ObjectId") ? cowId.slice(9, 33) : cowId
    );
    const buyerId = req.body.buyer;
    const buyerObjectId = new Types.ObjectId(
      buyerId.includes("ObjectId") ? buyerId.slice(9, 33) : buyerId
    );
    req.body.cow = cowObjectId;
    req.body.buyer = buyerObjectId;

    const isBuyerExist = await getAUserByIdService(buyerObjectId);
    const isCowExist = await getACowByIdService(cowObjectId);

    if (!isBuyerExist || !isCowExist) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid Buyer or Cow id!");
    }
    const session = await mongoose.startSession();

    try {
      session.startTransaction();
      const cowPrice = Number(isCowExist.price);
      const newBudget = Number(isBuyerExist.budget) - cowPrice;
      if (newBudget < 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Insufficient Balance!");
      }
      // update buyer budget
      await orderServices.updateBuyerAccount(buyerId, newBudget, session);
      // update seller income
      await orderServices.updateSellerAccount(
        isCowExist.seller,
        cowPrice,
        session
      );
      req.body.price = cowPrice;
      const result = await orderServices.createNewCowService(req.body);
      session.commitTransaction();
      session.endSession();
      sendResponse<IOrder>(res, {
        success: true,
        statusCode: StatusCodes.OK,
        data: result,
      });
    } catch (error) {
      session.abortTransaction();
      throw error;
    }
  }
);
export const getAllCowController: RequestHandler = catchAsync(
  async (req, res) => {
    const result = await orderServices.getAllCowService();
    sendResponse<IOrder[]>(res, {
      success: true,
      statusCode: StatusCodes.OK,
      data: result,
    });
  }
);
