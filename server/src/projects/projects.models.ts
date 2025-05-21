import z from "zod";

type CreateProjectModel = z.infer<typeof createProjectModel>["body"];
const createProjectModel = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().max(500),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters")
      .max(100_000, "Content must be less than 100,000 characters"),
    coverImageId: z.string().optional(),
    isPublished: z.boolean(),
    isFeatured: z.boolean(),

    tags: z.array(z.string()),
    codeUrl: z.string().optional(),
    liveUrl: z.string().optional(),
  }),
});

type UpdateProjectModel = z.infer<typeof updateProjectModel>["body"];
const updateProjectModel = z.object({
  params: z.object({ projectId: z.string() }),
  body: createProjectModel.shape.body.pick({
    title: true,
    description: true,
    coverImageId: true,
    isFeatured: true,
    isPublished: true,
    tags: true,
    content: true,
    codeUrl: true,
    liveUrl: true,
  }),
});

type SearchProjectsModel = z.infer<typeof searchProjectsModel>["query"];
const searchProjectsModel = z.object({
  query: z.object({
    term: z.string().optional(),
    pageIndex: z.string().optional(),
    pageSize: z.string().optional(),
    tags: z.string().optional(),
    // query is string unlike body which is boolean
    isFeatured: z.union([z.literal("false"), z.literal("true")]).optional(),
  }),
});

export {
  createProjectModel,
  CreateProjectModel,
  updateProjectModel,
  UpdateProjectModel,
  searchProjectsModel,
  SearchProjectsModel,
};
