import { z } from "zod";

const LoginFormSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().minLength(8, "")
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
