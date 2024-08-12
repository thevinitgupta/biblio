import { z } from "zod";

const LoginFormSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Password should be at least 8 characters")
})
export type LoginFormData = z.infer<typeof LoginFormSchema>;



const SignupFormSchema = z.object({
    name : z.string().min(4, "Name should be at-least 4 characters")
            .includes(" ",{message : "Please enter your complete name"}),
    password: string;
    email: string;
});
