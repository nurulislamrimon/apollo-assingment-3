import { Types } from "mongoose";

type ICowLocation =
  | "Dhaka"
  | "Chattogram"
  | "Barishal"
  | "Rajshahi"
  | "Sylhet"
  | "Comilla"
  | "Rangpur"
  | "Mymensingh";

type ICowLabel = "for sale" | "sold out";
type ICowCategory = "Dairy" | "Beef" | "DualPurpose";

interface ICow {
  name: string;
  age: number;
  price: number;
  location: ICowLocation;
  breed: string;
  weight: number;
  label: ICowLabel;
  category: ICowCategory;
  seller: Types.ObjectId;
}

export default ICow;
