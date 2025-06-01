"use client";

import { searchTagsHandler } from "@/lib/api/tags";
import { Tag } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const TagSelector = () => {
  const { error, isPending, data } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      return searchTagsHandler({ pageIndex: 1, pageSize: 10, name: "" });
    },
  });
  if (error) return "Unable to load tags";
  if (isPending) return "Loading...";
  return (
    <ul>
      {(data?.data as Tag[])?.map((item) => {
        return <li key={item.id}>{item.name}</li>;
      })}
    </ul>
  );
};

export default TagSelector;
