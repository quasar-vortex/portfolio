import z from "zod";

const basePostModel = z.object({
  title: z.string(),
  excerpt: z.string(),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(100_000, "Content must be less than 100,000 characters"),
  tags: z.array(z.string()),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  coverImageId: z.string().optional(),
  isActive: z.boolean().optional(),
});
type CreatePostModel = z.infer<typeof createPostModel>["body"];
const createPostModel = z.object({
  body: basePostModel.pick({
    title: true,
    excerpt: true,
    content: true,
    tags: true,
    isPublished: true,
    isFeatured: true,
    coverImageId: true,
  }),
});

type UpdatePostModel = z.infer<typeof updatePostModel>["body"];
const updatePostModel = z.object({
  params: z.object({ postId: z.string() }),
  body: basePostModel.pick({
    title: true,
    excerpt: true,
    content: true,
    tags: true,
    isPublished: true,
    isFeatured: true,
    coverImageId: true,
  }),
});

type SearchPostsModel = z.infer<typeof searchPostsModel>["query"];

const searchPostsModel = z.object({
  query: z.object({
    term: z.string().optional(),
    pageIndex: z.string().optional(),
    pageSize: z.string().optional(),
    tags: z.string().optional(),
    // query is string unlike body which is boolean
    isFeatured: z.union([z.literal("false"), z.literal("true")]).optional(),
    sortOrder: z.union([z.literal("asc"), z.literal("desc")]).optional(),
    sortKey: z.union([z.literal("publishDate"), z.literal("title")]).optional(),
  }),
});
export {
  CreatePostModel,
  createPostModel,
  UpdatePostModel,
  updatePostModel,
  SearchPostsModel,
  searchPostsModel,
};
