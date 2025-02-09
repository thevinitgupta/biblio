import { z } from "zod";

const passwordSchema = z.string()
.min(8, { message: "Password must be at least 8 characters long." })
.max(16, { message: "Password must be no more than 16 characters long." })
.refine((value) => /[0-9]/.test(value), {
  message: "Password must contain at least one digit (0-9).",
})
.refine((value) => /[!@#$%^&*]/.test(value), {
  message: "Password must contain at least one special character (!@#$%^&*).",
})
.refine((value) => /^[a-zA-Z0-9!@#$%^&*]+$/.test(value), {
  message: "Password can only contain letters, numbers, and special characters (!@#$%^&*).",
});


export const LoginFormSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: passwordSchema
})
export type LoginFormData = z.infer<typeof LoginFormSchema>;



export const SignupFormSchema = z.object({
    firstName : z.string().min(4, "First Name should be at-least 4 characters"),
    lastName : z.string().min(1, "Last Name should be at-least 1 character"),
    password: passwordSchema,
    email: z.string().email("Invalid Email"),
});

export type SignupFormData = z.infer<typeof SignupFormSchema>;

export const CreatePostSchema = z.object({
  title: z.string().min(15, "Title should be at-least 15 characters"),
  content: z.string().min(150, "Content should be at-least 150 characters"),
  taggedBook : z.object({
    id : z.string().nullable(),
    bookId : z.string().optional(),
    bookInfo : z.object({
      title : z.string(),
      authors : z.array(z.string()),
      publishedDate : z.string(),
      industryIdentifiers : z.array(z.object({
        type : z.string(),
        identifier : z.string()
      })),
      imageLinks : z.object({
        smallThumbnail : z.string(),
        thumbnail : z.string()
      })
    }),
  }),
  coverImage : z.string().optional()
})


export type CreatePostData = z.infer<typeof CreatePostSchema>;

const MAX_PROFILE_FILE_SIZE = 2097152;
const MAX_POST_FILE_SIZE = 5242880;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];


export const UploadProfileImageSchema = z.object({
  file : z.any()
  .refine((file) => file?.size <= MAX_PROFILE_FILE_SIZE, `Max image size is 2MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg and .png formats are supported."
  )
});
export type UploadProfileImageData = z.infer<typeof UploadProfileImageSchema>;


export const UploadPostImageSchema = z.object({
  file : z.any()
  .refine((file) => file?.size <= MAX_POST_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg and .png formats are supported."
  )
});
export type UploadPostImageData = z.infer<typeof UploadPostImageSchema>;
