"use client";

import PaginatedTable, {
  TableColumn,
} from "@/components/shared/PaginatedTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CoverImage, Project } from "@/lib/types";
import api from "@/lib/api";
import { useAuthStore } from "@/app/providers/storeProvider";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { capitalize } from "@/lib/utils";
import Image from "next/image";

const columns: TableColumn<Project>[] = [
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
            className="h-full w-full object-cover"
          />
        </div>
      ),
  },
  {
    key: "title",
    header: "Title",
    render: (val) => (val ? capitalize(val as Project["title"]) : ""),
  },
  { key: "slug", header: "Slug" },
  {
    key: "codeUrl",
    header: "Code URL",
    render: (val) =>
      val ? (
        <a
          href={val as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View Code
        </a>
      ) : (
        ""
      ),
  },
  {
    key: "liveUrl",
    header: "Live URL",
    render: (val) =>
      val ? (
        <a
          href={val as string}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 underline"
        >
          Visit Site
        </a>
      ) : (
        ""
      ),
  },
  {
    key: "author",
    header: "Author",
    render: (val) =>
      val ? capitalize((val as Project["author"]).firstName) : "",
  },
  {
    key: "ProjectTag",
    header: "Tags",
    render: (value) => {
      return (value as Project["ProjectTag"])
        .map((item) => item.tag.name)
        .join(",");
    },
  },
  {
    key: "isFeatured",
    header: "Featured?",
    render: (val) => (val ? "Yes" : "No"),
  },
];

export default function ManageProjectsPage() {
  const { accessToken } = useAuthStore();
  const qc = useQueryClient();

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Button asChild variant="outline">
          <Link href="/dash/projects/new">New Project</Link>
        </Button>
      </div>
      <PaginatedTable<Project>
        queryKey="manageProjects"
        queryFn={async (params) => api.projectService.getManyProjects(params)}
        columns={columns}
        actions={(project) => (
          <div className="flex gap-2">
            <Link href={`/dash/projects/edit/${project.id}`}>
              <Button type="button" variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              onClick={async () => {
                try {
                  await api.projectService.deleteProjectByIdHandler(
                    project.id,
                    accessToken!
                  );
                  qc.invalidateQueries({ queryKey: ["manageProjects"] });
                  qc.invalidateQueries({ queryKey: ["projects"] });
                  if (project.isFeatured)
                    qc.invalidateQueries({ queryKey: ["featuredProjects"] });
                } catch (error) {
                  console.error(error);
                  toast.error("Unable to delete project!");
                }
              }}
              variant="destructive"
              size="sm"
            >
              Delete
            </Button>
          </div>
        )}
        searchPlaceholder="Search projects..."
      />
    </section>
  );
}
