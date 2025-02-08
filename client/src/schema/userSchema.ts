import { z } from "zod";

export const userSignupSchema = z.object({
    fullname: z.string().min(3, "Full name is too short").max(50, "Full name is too long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(15),
    contact: z.string().min(10, "Contact number must be 10 digits"),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(15),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;