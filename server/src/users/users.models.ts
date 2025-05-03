import z from "zod";
import { baseUseModel } from "../auth";

type UpdateUserModel = z.infer<typeof updateUserModel>["body"];
const updateUserModel = z.object({
  params: z.object({ userId: z.string() }),
  body: z.object({
    firstName: baseUseModel.shape.firstName,
    lastName: baseUseModel.shape.lastName,
    email: baseUseModel.shape.email,
    role: z.union([z.literal("ADMIN"), z.literal("USER")]).optional(),
    bio: z
      .string()
      .max(250, { message: "Bio cannot exceeed 250 characters." })
      .optional(),
    avatarFileId: z
      .string()
      .max(250, { message: "Bio cannot exceeed 250 characters." })
      .optional(),
    currentPassword: baseUseModel.shape.password.optional(),
    newPassword: baseUseModel.shape.password.optional(),
  }),
});
type SearchUsersModel = z.infer<typeof searchUsersModel>["query"];
const searchUsersModel = z.object({
  query: z.object({
    pageIndex: z.string(),
    pageSize: z.string(),
    firstName: baseUseModel.shape.firstName.optional(),
    lastName: baseUseModel.shape.lastName.optional(),
    email: baseUseModel.shape.email.optional(),
  }),
});

export { updateUserModel, UpdateUserModel, searchUsersModel, SearchUsersModel };
