import mongoose, { Schema } from "mongoose";
import ICow from "./cow.interfaces";
import { getAUserByIdService } from "../user/user.services";
import ApiError from "../../../errors/api_error";
import { StatusCodes } from "http-status-codes";

const cowSchema = new mongoose.Schema<ICow>(
  {
    name: String,
    age: Number,
    price: Number,
    location: {
      type: String,
      enum: [
        "Dhaka",
        "Chattogram",
        "Barishal",
        "Rajshahi",
        "Sylhet",
        "Comilla",
        "Rangpur",
        "Mymensingh",
      ],
      required: true,
    },
    breed: String,
    weight: Number,
    label: { type: String, enum: ["for sale", "sold out"], required: true },
    category: {
      type: String,
      enum: ["Dairy", "Beef", "DualPurpose"],
      required: true,
    },
    seller: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

cowSchema.pre("save", async function (next) {
  const isSellerExist = await getAUserByIdService(this.seller);

  if (!isSellerExist || isSellerExist.role !== "seller") {
    const err = new ApiError(
      StatusCodes.NOT_ACCEPTABLE,
      "Please provide a valid seller id!"
    );
    next(err);
  }
  next();
});

const Cow = mongoose.model<ICow>("Cow", cowSchema);

export default Cow;
