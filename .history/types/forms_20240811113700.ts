import { z } from "zod";

const LoginFormSchema = z.object({
    email: z.ema
    password: string;
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
