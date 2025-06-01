"use client";

import { searchTagsHandler } from "@/lib/api/tags";
import { Tag } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../ui/button";
import { FiPlus, FiX } from "react-icons/fi";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import useDebouncedValue from "@/app/hooks/useDebouncedValue";

type TagSelectorProps = {
  onTagSelection: (tag: { id: string; name: string }) => void;
  onTagRemoval: (tag: { id: string; name: string }) => void;
  selectedTags: { id: string; name: string }[];
};
const TagSelector = (p: TagSelectorProps) => {
  const { onTagRemoval, onTagSelection, selectedTags } = p;
  const [tagName, setTagName] = useState("");

  const [debouncedTagName] = useDebouncedValue(tagName, 300);
  const { error, isPending, data } = useQuery<{ data: Tag[] }>({
    queryKey: ["tags", debouncedTagName],
    queryFn: async () => {
      return searchTagsHandler({
        pageIndex: 1,
        pageSize: 10,
        name: debouncedTagName || "",
      });
    },
  });

  return (
    <div>
      <label htmlFor="tags" className="text-gray-600 mb-2 block">
        Tags
      </label>
      {selectedTags.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-2">
          {selectedTags.map((t) => {
            return (
              <li key={t.id}>
                <Button
                  type="button"
                  onClick={() => onTagRemoval(t)}
                  disabled={!selectedTags.some((sTag) => sTag.id === t.id)}
                  className="disabled:bg-gray-700 bg-red-500 cursor-pointer hover:bg-red-600 duration-200"
                >
                  <FiX /> {t.name}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
      <input
        onChange={(e) => {
          setTagName(e.target.value);
        }}
        value={tagName}
        className="border mb-2 border-gray-300 w-full p-2 focus:border-gray-500 duration-200 outline-none"
        type="text"
        placeholder="Search..."
      />

      {error && (
        <Alert className="mb-6 text-red-600 font-bold shadow-md">
          <AlertTitle>
            <h4 className="font-bold text-lg sm:text-xl">
              Unable to Load Tags
            </h4>
          </AlertTitle>
          <AlertDescription>{(error as Error).message}</AlertDescription>
        </Alert>
      )}
      {isPending ? (
        <span className="text-gray-600">Loading tags...</span>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {data?.data?.slice(0, 5).map((item) => {
            return (
              <li key={item.id}>
                <Button
                  type="button"
                  onClick={() => onTagSelection(item)}
                  disabled={selectedTags.some((sTag) => sTag.id === item.id)}
                  className="disabled:bg-gray-700 bg-indigo-500 cursor-pointer hover:bg-indigo-600 duration-200"
                >
                  <FiPlus /> {item.name}
                </Button>
              </li>
            );
          })}
          {data && data.data.length === 0 && "No tags to display"}
        </ul>
      )}
    </div>
  );
};

export default TagSelector;
