"use client";

import PaginatedTable, {
  TableColumn,
} from "@/components/shared/PaginatedTable";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Post } from "@/lib/types";
import api from "@/lib/api";

const columns: TableColumn<Post>[] = [
  { key: "title", header: "Title" },
  { key: "slug", header: "Slug" },
  {
    key: "author",
    header: "Author",
    render: (val) => (val ? (val as Post["author"]).firstName : ""),
  },
];

export default function ManagePostsPage() {
  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Posts</h1>
        <Button asChild variant="outline">
          <Link href="/dash/posts/new">New Post</Link>
        </Button>
      </div>
      <PaginatedTable<Post>
        queryKey="managePosts"
        queryFn={async (params) => api.postService.searchPosts(params)}
        columns={columns}
        actions={(post) => (
          <div className="flex gap-2">
            <Link href={`/dash/posts/edit/${post.id}`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        )}
        searchPlaceholder="Search posts..."
      />
    </section>
  );
}
