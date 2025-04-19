import z from "zod";

// 8–16 chars, at least one letter, one digit, one special character
const passwordMessage =
  "Password Legnth Must Be Between 8 and 16 Characters and Include One Letter, One Digit, and One Special Characters.";
const passwordRegex =
  /^(?=.{8,16}$)(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;

const baseUseModel = z.object({
  email: z.string().email(),
  password: z.string().regex(passwordRegex, { message: passwordMessage }),
  confirmPassword: z
    .string()
    .regex(passwordRegex, { message: passwordMessage }),
});
export type RegisterUserModel = z.infer<typeof registerUserModel>["body"];
export const registerUserModel = z
  .object({
    body: baseUseModel.pick({
      email: true,
      password: true,
      confirmPassword: true,
    }),
  })
  .refine(
    ({ body: { password, confirmPassword } }) => password === confirmPassword,
    {
      message: "Passwords Must Match",
    }
  );
export type LoginUserModel = z.infer<typeof loginUserModel>["body"];
export const loginUserModel = z.object({
  body: baseUseModel.pick({ email: true, password: true }),
});
