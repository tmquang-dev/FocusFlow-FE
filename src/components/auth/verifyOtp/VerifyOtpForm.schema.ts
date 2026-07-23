import { z } from "zod";

export const verifyOtpSchema = z.object({
    otp: z
        .string()
        .min(1, { message: "OTP code is required" })
        .length(6, { message: "OTP code must be 6 digits" })
        .regex(/^\d+$/, { message: "OTP code must contain only numbers" }),
});

export type VerifyOtpSchema = z.infer<typeof verifyOtpSchema>;
