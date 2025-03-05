import z from "zod";
import authModels from "./authModels";
const selectUser = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  role: true,
  registeredAt: true,
  lastLoginAt: true,
  avatarFileId: true,
};
export type UpdateUserProfileModel = z.infer<typeof updateUserModel>["body"];
const updateUserModel = z.object({
  body: z.object({
    firstName:
      authModels.registerUserModel.shape.body.shape.firstName.optional(),
    lastName: authModels.registerUserModel.shape.body.shape.lastName.optional(),
    email: authModels.registerUserModel.shape.body.shape.email.optional(),
    password: authModels.registerUserModel.shape.body.shape.password.optional(),
    newPassword:
      authModels.registerUserModel.shape.body.shape.password.optional(),
    bio: z
      .string()
      .min(20, {
        message: "Bio must be at least 20 characters long to save.",
      })
      .max(250, { message: "Bio cannot exceed 250 characters." })
      .optional(),
    avatarFileId: z
      .string()
      .max(36, { message: "ID cannot exceed 36 characters." })
      .optional(),
  }),
});
export default {
  selectUser,
  updateUserModel,
};
