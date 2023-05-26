import * as z from "zod";

const currencyType = () =>
  z.coerce
    .number()
    .multipleOf(0.01)
    .nonnegative({ message: "Must not be a negative number" });

export const workshopSchema = z.object({
  name: z.string().min(3).max(128),
  description: z.string().optional(),
  startDate: z.date(),
  targetSize: z.coerce.number().min(1).max(25),
  paid: z.preprocess((v) => v === "Yes", z.boolean()),
  price: currencyType().optional(),
  submissionLength: z.enum(["Short", "Medium", "Long", "Book"]).optional(),
  open: z.boolean().default(true),
  archived: z.boolean().default(false),
});
