import z from "zod";

const basePostModel = z.object({
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
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
    isActive: true,
  }),
});

type SearchPostsModel = z.infer<typeof searchPostsModel>["query"];

const searchPostsModel = z.object({
  query: z.object({
    term: z.string().optional(),
    pageIndex: z.string().optional(),
    pageSize: z.string().optional(),
    tags: z.array(z.string()),
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
