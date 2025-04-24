import z from "zod";

type CreateTagModel = z.infer<typeof createTagModel>["body"];
const createTagModel = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, { message: "Tag name must be greater than 2 characters." })
      .max(50, { message: "Tag name cannot exceed 50 characters." }),
  }),
});

type UpdateTagModel = z.infer<typeof updateTagModel>["body"];
const updateTagModel = z.object({
  params: z.object({
    tagId: z.string().max(36, { message: "UUID Doesn't Exceed 36 Characters" }),
  }),
  body: z.object({
    name: z
      .string()
      .min(2, { message: "Tag name must be greater than 2 characters." })
      .max(50, { message: "Tag name cannot exceed 50 characters." }),
  }),
});

type SearchTagsModel = z.infer<typeof searchTagsModel>["query"];
const searchTagsModel = z.object({
  query: z.object({
    name: z
      .string()
      .max(50, { message: "Search cannot exceed 50 characters." })
      .optional(),
    pageIndex: z.string().optional(),
    pageSize: z.string().optional(),
  }),
});

export {
  CreateTagModel,
  createTagModel,
  UpdateTagModel,
  updateTagModel,
  SearchTagsModel,
  searchTagsModel,
};
