import { z } from "zod";

export const orderZodSchema = z.object({
  body: z.object({
    cow: z.string({
      required_error: "Cow required!",
    }),
    buyer: z.string({
      required_error: "Buyer is required!",
    }),
  }),
});

export default orderZodSchema;
