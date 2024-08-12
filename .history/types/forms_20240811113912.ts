import { z } from "zod";

const LoginFormSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Password should be at least 8 characters")
})
export type LoginFormData = 

export interface SignupFormData {
    name : string;
    password: string;
    email: string;
}
