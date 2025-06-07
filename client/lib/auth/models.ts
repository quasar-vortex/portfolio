import { Fields } from "@/components/shared/form";
import z from "zod";
export const passwordRegex = new RegExp(
  /^(?=.{8,16}$)(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/
);
export const pMessage =
  "Must include at least one upper, one lower, one special and one number in your password. Between 8 and 16 characters.";
export const baseUserModel = z.object({
  email: z.string().email({ message: "Must enter a valid email address." }),
  password: z.string().regex(passwordRegex, {
    message: pMessage,
  }),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters.")
    .max(20, "First name cannot exceed 20 characters."),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters.")
    .max(20, "Last name cannot exceed 20 characters."),
  confirmPassword: z.string().regex(passwordRegex, { message: pMessage }),
});
export const loginSchema = baseUserModel.pick({ email: true, password: true });

export type LoginSchema = z.infer<typeof loginSchema>;
export const loginFields: Fields<LoginSchema> = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email...",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password...",
    type: "password",
  },
];

export const registerSchema = baseUserModel.pick({
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  confirmPassword: true,
});

export const refinedSchema = registerSchema.refine(
  ({ password, confirmPassword }) => password === confirmPassword,
  {
    message: "Passwords must match",
    path: ["password", "confirmPassword"],
  }
);

export type RegisterSchema = z.infer<typeof registerSchema>;
export const registerFields: Fields<RegisterSchema> = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter your first name...",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter your last name...",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email...",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password...",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your password...",
    type: "password",
  },
];
