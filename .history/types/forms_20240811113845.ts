import { z } from "zod";

const LoginFormSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Password should be atleast 8 characters")
})
export interface LoginFormData {
    username: string;
    password: string;
}

export interface SignupFormData {
    name : string;
    password: string;
    email: string;
}
