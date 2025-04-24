import z from "zod";

type CreatePostModel = z.infer<typeof createPostModel>["body"];
const createPostModel = z.object({
  body: z.object({
    title: z.string(),
    excerpt: z.string(),
    content: z.string(),
    tags: z.array(z.string()),
    isPublished: z.boolean(),
  }),
});
export { CreatePostModel, createPostModel };
