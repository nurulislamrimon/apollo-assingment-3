import mongoose, { Types } from "mongoose";
import IOrder from "./order.interfaces";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    trxId: { type: String, required: true },
    cow: Types.ObjectId,
    buyer: Types.ObjectId,
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
