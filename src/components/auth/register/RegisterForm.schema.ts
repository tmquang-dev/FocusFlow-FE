import { z } from "zod";

export const registerSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;