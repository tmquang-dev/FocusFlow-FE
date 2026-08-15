import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
