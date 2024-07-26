import { z } from "zod";

export const userProfileSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required!"),
  city: z.string().min(1, "City is required!"),
  addressLine1: z.string().min(1, "Address Line is required!"),
  country: z.string().min(1, "Country is required!"),
});

export type TUserProfileForm = z.infer<typeof userProfileSchema>;
