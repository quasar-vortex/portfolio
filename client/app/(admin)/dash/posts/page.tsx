"use client";

import PaginatedTable, {
  TableColumn,
} from "@/components/shared/PaginatedTable";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CoverImage, Post } from "@/lib/types";
import api from "@/lib/api";
import { useAuthStore } from "@/app/providers/storeProvider";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { capitalize } from "@/lib/utils/index";
import Image from "next/image";

const columns: TableColumn<Post>[] = [
  {
    key: "coverImage",
    header: "Cover Image",
    render: (val) =>
      val && (
        <div className="w-24 h-24">
          <Image
            src={(val as CoverImage).url}
            height={200}
            width={200}
            alt="cover"
          />
        </div>
      ),
  },
  {
    key: "title",
    header: "Title",
    render: (val) => (val ? capitalize(val as Post["title"]) : ""),
  },
  { key: "slug", header: "Slug" },
  {
    key: "author",
    header: "Author",
    render: (val) => (val ? capitalize((val as Post["author"]).firstName) : ""),
  },
  {
    key: "PostTag",
    header: "Tags",
    render: (value) => {
      return (value as Post["PostTag"]).map((item) => item.tag.name).join(",");
    },
  },
  {
    key: "isFeatured",
    header: "Is Post Featured?",
    render: (val) => (val ? "Yes" : "No"),
  },
];

export default function ManagePostsPage() {
  const { accessToken } = useAuthStore();
  const qc = useQueryClient();
  const r = useRouter();

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
        queryFn={async (params) =>
          api.postService.searchPosts(params, accessToken!)
        }
        columns={columns}
        actions={(post) => (
          <div className="flex gap-2">
            <Link href={`/dash/posts/edit/${post.id}`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              onClick={async () => {
                try {
                  await api.postService.deletePostById(post.id, accessToken!);
                  qc.invalidateQueries({
                    queryKey: ["managePosts"],
                  });
                  qc.invalidateQueries({
                    queryKey: ["posts"],
                  });
                  if (post.isFeatured)
                    qc.invalidateQueries({
                      queryKey: ["featuredPosts"],
                    });
                } catch (error) {
                  console.error(error);
                  toast.error("Unable to delete post!");
                }
              }}
              variant="destructive"
              size="sm"
            >
              Delete
            </Button>
          </div>
        )}
        searchPlaceholder="Search posts..."
      />
    </section>
  );
}
