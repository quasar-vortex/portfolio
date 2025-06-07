import z from "zod";
import { baseUseModel } from "../auth";

const updateUserRole = z.object({
  params: z.object({ userId: z.string() }),
  body: z.object({
    role: z.union([z.literal("ADMIN"), z.literal("USER")]).optional(),
  }),
});
type UpdateUserRole = z.infer<typeof updateUserRole>["body"];
type UpdateUserModel = z.infer<typeof updateUserModel>["body"];

const updateUserModel = z.object({
  params: z.object({ userId: z.string() }),
  body: z.object({
    firstName: baseUseModel.shape.firstName,
    lastName: baseUseModel.shape.lastName,
    email: baseUseModel.shape.email,

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
    term: z.string().max(100).optional(),
  }),
});

export {
  updateUserRole,
  UpdateUserRole,
  updateUserModel,
  UpdateUserModel,
  searchUsersModel,
  SearchUsersModel,
};
