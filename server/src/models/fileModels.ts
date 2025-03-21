import z from "zod";

export type QueryFileModel = z.infer<typeof queryFileModel>["query"];
const queryFileModel = z.object({
  query: z.object({
    pageSize: z.string().optional(),
    pageIndex: z.string().optional(),
    searchTerm: z.string().optional(),
  }),
});
export default {
  queryFileModel,
};
