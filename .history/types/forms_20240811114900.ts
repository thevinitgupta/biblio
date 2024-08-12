import { z } from "zod";

const LoginFormSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Password should be at least 8 characters")
})
export type LoginFormData = z.infer<typeof LoginFormSchema>;



const SignupFormSchema = z.object({
    name : z.string().min(4, "Name should be at-least 4 characters")
    .includes(" ",{message : "Please enter your complete name"}),
    password: z.string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(16, { message: "Password must be no more than 16 characters long." })
    .refine((value) => /[0-9]/.test(value), {
      message: "Password must contain at least one digit (0-9).",
    })
    .refine((value) => /[!@#$%^&*]/.test(value), {
      message: "Password must contain at least one special character (!@#$%^&*).",
    })
    .refine((value) => /^[a-zA-Z0-9!@#$%^&*]+$/.test(value), {
      message: "Password can only contain letters, numbers, and special characters (!@#$%^&*).",
    })
    email: z.string().email("Invalid Email"),
});

export type SignupFormData = z.infer<typeof SignupFormSchema>;
