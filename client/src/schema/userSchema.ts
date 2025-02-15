import { z } from "zod";

{/* User Signup Schema */}

export const userSignupSchema = z.object({
    fullname: z.string().min(3, "Full name is too short").max(50, "Full name is too long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(15, "Password must be at most 15 characters"),
    contact: z.string().min(10, "Contact number must be 10 digits").max(10, "Contact number must be 10 digits"),
});

export type SignupInputState = z.infer<typeof userSignupSchema>;


{/* User Login Schema */}

export const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(15),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;


{/* Uer Profile Schema */}
export const userProfileSchema = z.object({
    fullname: z.string().min(3, "Full name is too short").max(50, "Full name is too long"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(6, "Address must be at least 6 characters").max(200, "Address must be at most 200 characters"),
    contact: z.string().min(10, "Contact number must be 10 digits").max(10, "Contact number must be 10 digits"),
    city: z.string().min(3, "City must be at least 3 characters").max(50, "City must be at most 50 characters"),
});

export type ProfileInputState = z.infer<typeof userProfileSchema>;