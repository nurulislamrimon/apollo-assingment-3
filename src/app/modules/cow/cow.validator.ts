import { z } from "zod";
import { Types } from "mongoose";

const cowLocations = [
  "Dhaka",
  "Chattogram",
  "Barishal",
  "Rajshahi",
  "Sylhet",
  "Comilla",
  "Rangpur",
  "Mymensingh",
] as const;

const cowLabel = ["for sale", "sold out"] as const;
const cowCategory = ["Dairy", "Beef", "DualPurpose"] as const;

export const cowZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Age is required!",
    }),
    age: z.number({
      required_error: "Age is required!",
    }),
    price: z.number({
      required_error: "Price is required!",
    }),
    location: z.enum(cowLocations),
    breed: z.string({
      required_error: "Breed is required!",
    }),
    weight: z.number({
      required_error: "Weight is required!",
    }),
    label: z.enum(cowLabel),
    category: z.enum(cowCategory),
    seller: z.string({
      required_error: "Seller id is required!",
    }),
  }),
});
