import { z } from "zod";

export interface LoginFormData {
    username: z.ZodStringDef.
    password: string;
}

export interface SignupFormData {
    name : string;
    password: string;
    email: string;
}
