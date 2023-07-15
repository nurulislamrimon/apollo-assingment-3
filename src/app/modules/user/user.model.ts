import mongoose from "mongoose";
import IUser from "./user.interfaces";

const userSchema = new mongoose.Schema<IUser>(
  {
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ["buyer", "seller"], required: true },
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

userSchema.pre("save", function (next) {
  if (this.role !== "buyer") {
    this.budget = 0;
  }
  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
