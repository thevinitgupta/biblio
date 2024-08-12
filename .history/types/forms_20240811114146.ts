import { z } from "zod";

const LoginFormSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Password should be at least 8 characters")
})
export type LoginFormData = z.infer<typeof LoginFormSchema>;



const SignupFormSchema = z.object({
    name : z.string().min(4, "")
    password: string;
    email: string;
});
