import z from "zod";

type SearchFilesModel = z.infer<typeof searchFilesModel>["query"];
const searchFilesModel = z.object({
  query: z.object({
    name: z
      .string()
      .max(100, { message: "Search cannot exceed 100 characters." })
      .optional(),
    pageIndex: z.string().optional(),
    pageSize: z.string().optional(),
  }),
});

export { searchFilesModel, SearchFilesModel };
