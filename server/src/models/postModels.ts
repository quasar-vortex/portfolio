import z from "zod";

export type CreateNewPostModel = z.infer<typeof createNewPostModel>["body"];
const createNewPostModel = z.object({
  body: z.object({
    authorId: z
      .string()
      .max(36, { message: "Author ID cannot exceed 36 characters." }),
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters long." })
      .max(100, { message: "Title cannot exceed 100 characters." }),
    excerpt: z
      .string()
      .min(2, { message: "Excerpt must be at least 2 characters long." })
      .max(250, { message: "Excerpt cannot exceed 250 characters." })
      .optional(),
    coverImageId: z
      .string()
      .max(36, { message: "Cover Image ID cannot exceed 36 characters." })
      .optional(),
    content: z
      .string()
      .min(10, { message: "Content must be at least 10 characters long." })
      .max(2500, { message: "Content cannot exceed 2500 characters." }),
    isPublished: z.boolean({
      message: "isPublished must be a boolean value.",
    }),
    tags: z.array(z.string()),
  }),
});
export type UpdatePostModel = z.infer<typeof updatePostModel>["body"];
const updatePostModel = z.object({
  params: z.object({
    postId: z
      .string()
      .max(36, { message: "Post ID cannot exceed 36 characters." }),
  }),
  body: z.object({
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters long." })
      .max(100, { message: "Title cannot exceed 100 characters." }),
    excerpt: z
      .string()
      .min(2, { message: "Excerpt must be at least 2 characters long." })
      .max(250, { message: "Excerpt cannot exceed 250 characters." })
      .optional(),
    coverImageId: z
      .string()
      .max(36, { message: "Cover Image ID cannot exceed 36 characters." })
      .optional(),
    content: z
      .string()
      .min(10, { message: "Content must be at least 10 characters long." })
      .max(2500, { message: "Content cannot exceed 2500 characters." }),
    isPublished: z.boolean({
      message: "isPublished must be a boolean value.",
    }),
    tags: z.array(z.string()),
  }),
});

export type GetPostBySlugModel = z.infer<typeof getPostBySlugModel>["params"];
const getPostBySlugModel = z.object({
  params: z.object({
    slug: z
      .string()
      .max(100, { message: "Slug cannot exceed 100 characters." }),
  }),
});
export type QueryPostsModel = z.infer<typeof queryPostsModel>["query"];
const queryPostsModel = z.object({
  query: z.object({
    pageSize: z.string().optional(),
    pageIndex: z.string().optional(),
    searchTerm: z.string().optional(),
    tags: z.array(z.string()),
  }),
});
export default {
  createNewPostModel,
  updatePostModel,
  getPostBySlugModel,
  queryPostsModel,
};
