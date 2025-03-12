import z from "zod";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
export type RegisterUserModel = z.infer<typeof registerUserModel>["body"];
const registerUserModel = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long." })
      .max(20, { message: "First name cannot exceed 20 characters." }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long." })
      .max(20, { message: "Last name cannot exceed 20 characters." }),
    email: z.string().email({ message: "Email is not a valid email address." }),
    password: z.string().regex(passwordRegex, {
      message:
        "Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one special character (@$!%*?&), and one number.",
    }),
  }),
});
export type LoginUserModel = z.infer<typeof loginUserModel>["body"];

const loginUserModel = z.object({
  body: registerUserModel.shape.body.pick({ email: true, password: true }),
});

export default {
  loginUserModel,
  registerUserModel,
};
