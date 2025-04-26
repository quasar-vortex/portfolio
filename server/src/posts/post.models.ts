import z from "zod";

type CreatePostModel = z.infer<typeof createPostModel>["body"];
const createPostModel = z.object({
  body: z.object({
    title: z.string(),
    excerpt: z.string(),
    content: z.string(),
    tags: z.array(z.string()),
    isPublished: z.boolean(),
    isFeatured: z.boolean().optional(),
  }),
});

type UpdatePostModel = z.infer<typeof updatePostModel>["body"];
const updatePostModel = z.object({
  params: z.object({ postId: z.string() }),
  body: z.object({
    title: z.string(),
    excerpt: z.string(),
    content: z.string(),
    tags: z.array(z.string()),
    isPublished: z.boolean(),
    isFeatured: z.boolean().optional(),
  }),
});
export { CreatePostModel, createPostModel, UpdatePostModel, updatePostModel };
