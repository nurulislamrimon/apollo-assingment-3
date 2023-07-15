import { RequestHandler } from "express";
import * as cowServices from "./cow.services";
import { sendResponse } from "../../../shared/send_response";
import { StatusCodes } from "http-status-codes";
import ICow from "./cow.interfaces";
import { catchAsync } from "../../../shared/catch_async";
import { Types } from "mongoose";

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
