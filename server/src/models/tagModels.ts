import z from "zod";

export type QueryTagModel = z.infer<typeof queryTagModel>["query"];
const queryTagModel = z.object({
  query: z.object({
    pageSize: z.string().optional(),
    pageIndex: z.string().optional(),
    searchTerm: z.string().optional(),
  }),
});
export default {
  queryTagModel,
};
