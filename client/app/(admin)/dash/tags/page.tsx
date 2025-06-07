"use client";

import PaginatedTable, {
  TableColumn,
} from "@/components/shared/PaginatedTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useAuthStore } from "@/app/providers/storeProvider";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { Tag } from "@/lib/types";

const columns: TableColumn<Tag>[] = [
  {
    key: "id",
    header: "Tag ID",
    render: (val) => val,
  },
  {
    key: "name",
    header: "Tag Name",
    render: (val) => val,
  },
];

export default function ManageTagsPage() {
  const { accessToken } = useAuthStore();
  const qc = useQueryClient();

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Tags</h1>
        <Button asChild variant="outline">
          <Link href="/dash/tags/new">New Tag</Link>
        </Button>
      </div>
      <PaginatedTable<Tag>
        queryKey="manageTags"
        queryFn={async (params) => api.tagService.searchTagsHandler(params)}
        columns={columns}
        actions={(tag) => (
          <div className="flex gap-2">
            <Link href={`/dash/tags/edit/${tag.id}`}>
              <Button type="button" variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              onClick={async () => {
                try {
                  await api.tagService.deleteTagByIdHandler(
                    tag.id,
                    accessToken!
                  );
                  qc.invalidateQueries({ queryKey: ["manageTags"] });
                } catch (error) {
                  console.error(error);
                  toast.error("Unable to delete tag!");
                }
              }}
              variant="destructive"
              size="sm"
            >
              Delete
            </Button>
          </div>
        )}
        searchPlaceholder="Search tags..."
      />
    </section>
  );
}
