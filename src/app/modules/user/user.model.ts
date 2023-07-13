import mongoose from "mongoose";
import IUser from "./user.interfaces";

const userSchema = new mongoose.Schema<IUser>(
  {
    phoneNumber: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
