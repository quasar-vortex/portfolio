import z from "zod";

export type CreateNewProjectModel = z.infer<
  typeof createNewProjectModel
>["body"];
const createNewProjectModel = z.object({
  body: z.object({
    authorId: z
      .string()
      .max(36, { message: "Author ID cannot exceed 36 characters." }),
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters long." })
      .max(100, { message: "Title cannot exceed 100 characters." }),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long." })
      .max(250, { message: "Description cannot exceed 250 characters." }),
    coverImageId: z
      .string()
      .max(36, { message: "Cover Image ID cannot exceed 36 characters." })
      .optional(),
    productionUrl: z
      .string()
      .url({ message: "Production URL must be a valid URL." })
      .max(255, { message: "Production URL cannot exceed 255 characters." }),
    codeUrl: z
      .string()
      .url({ message: "Code URL must be a valid URL." })
      .max(255, { message: "Code URL cannot exceed 255 characters." }),
    isPublished: z.boolean({
      message: "isPublished must be a boolean value.",
    }),
    tags: z.array(z.string()),
  }),
});

export type UpdateProjectModel = z.infer<typeof updateProjectModel>["body"];
const updateProjectModel = z.object({
  params: z.object({
    projectId: z
      .string()
      .max(36, { message: "Project ID cannot exceed 36 characters." }),
  }),
  body: z.object({
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters long." })
      .max(100, { message: "Title cannot exceed 100 characters." })
      .optional(),
    description: z
      .string()
      .min(10, { message: "Description must be at least 10 characters long." })
      .max(250, { message: "Description cannot exceed 250 characters." })
      .optional(),
    coverImageId: z
      .string()
      .max(36, { message: "Cover Image ID cannot exceed 36 characters." })
      .optional(),
    productionUrl: z
      .string()
      .url({ message: "Production URL must be a valid URL." })
      .max(255, { message: "Production URL cannot exceed 255 characters." })
      .optional(),
    codeUrl: z
      .string()
      .url({ message: "Code URL must be a valid URL." })
      .max(255, { message: "Code URL cannot exceed 255 characters." })
      .optional(),
    isPublished: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export type GetProjectBySlugModel = z.infer<
  typeof getProjectBySlugModel
>["params"];
const getProjectBySlugModel = z.object({
  params: z.object({
    slug: z
      .string()
      .max(100, { message: "Slug cannot exceed 100 characters." }),
  }),
});

export type QueryProjectsModel = z.infer<typeof queryProjectsModel>["query"];
const queryProjectsModel = z.object({
  query: z.object({
    pageSize: z.string().optional(),
    pageIndex: z.string().optional(),
    searchTerm: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export default {
  createNewProjectModel,
  updateProjectModel,
  getProjectBySlugModel,
  queryProjectsModel,
};
