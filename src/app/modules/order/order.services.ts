import uniqid from "uniqid";
import IOrder from "./order.interfaces";
import Order from "./order.model";
import { ClientSession, Types } from "mongoose";
import User from "../user/user.model";

export const updateBuyerAccount = async (
  id: Types.ObjectId,
  newBudget: number,
  session: ClientSession
) => {
  const result = await User.findByIdAndUpdate(
    id,
    { $set: { budget: newBudget } },
    { session }
  );
  return result;
};
export const updateSellerAccount = async (
  id: Types.ObjectId,
  cowPrice: number,
  session: ClientSession
) => {
  const result = await User.findByIdAndUpdate(
    id,
    { $set: { income: cowPrice } },
    { session }
  );
  return result;
};

export const createNewCowService = async (payload: IOrder) => {
  const trxId = uniqid();
  payload.trxId = trxId;
  const result = await Order.create(payload);
  return result;
};

export const getAllCowService = async () => {
  const result = await Order.find({});
  return result;
};
