import { Types } from "mongoose";

interface IOrder {
  trxId: string;
  cow: Types.ObjectId;
  buyer: Types.ObjectId;
  price: number;
}

export default IOrder;
