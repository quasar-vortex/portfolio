"use client";

import PaginatedTable, {
  TableColumn,
} from "@/components/shared/PaginatedTable";
import Spinner from "@/components/shared/Spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import api from "@/lib/api";
import { capitalize } from "@/lib/utils";
import Image from "next/image";
import { Post, CoverImage, Project } from "@/lib/types";

const postColumns: TableColumn<Post>[] = [
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
];

const projectColumns: TableColumn<Project>[] = [
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

const DashBoard = () => {
  const { isPending: postsPending, error: postsError } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: async () => api.postService.searchPosts({ isFeatured: true }),
  });

  const { isPending: projectsPending, error: projectsError } = useQuery({
    queryKey: ["featuredProjects"],
    queryFn: async () =>
      api.projectService.getManyProjects({ isFeatured: true }),
  });

  return (
    <section className="flex-1 p-6 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl sm:text-4xl font-bold">Dashboard</h1>
        <Button asChild variant="outline">
          <Link href="/dash/profile">Settings</Link>
        </Button>
      </header>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-600">
            Featured Posts
          </h2>
          {postsError && (
            <Alert className="mb-6 text-red-600 font-bold shadow-md">
              <AlertTitle>
                <h4 className="font-bold text-lg sm:text-xl">
                  Unable to Load Posts
                </h4>
              </AlertTitle>
              {postsError?.message && (
                <AlertDescription>{postsError.message}</AlertDescription>
              )}
            </Alert>
          )}
          {postsPending && <Spinner />}
          {!postsPending && (
            <PaginatedTable<Post>
              displaySearch={false}
              queryKey="featuredPosts"
              queryFn={async (params) =>
                api.postService.searchPosts({ ...params, isFeatured: true })
              }
              columns={postColumns}
              searchPlaceholder="Search featured posts..."
              actions={(post) => (
                <Link href={`/dash/posts/edit/${post.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
              )}
            />
          )}
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-600">
            Featured Projects
          </h2>
          {projectsError && (
            <Alert className="mb-6 text-red-600 font-bold shadow-md">
              <AlertTitle>
                <h4 className="font-bold text-lg sm:text-xl">
                  Unable to Load Projects
                </h4>
              </AlertTitle>
              {projectsError?.message && (
                <AlertDescription>{projectsError.message}</AlertDescription>
              )}
            </Alert>
          )}
          {projectsPending && <Spinner />}
          {!projectsPending && (
            <PaginatedTable<Project>
              displaySearch={false}
              queryKey="featuredProjects"
              queryFn={async (params) =>
                api.projectService.getManyProjects({
                  ...params,
                  isFeatured: true,
                })
              }
              columns={projectColumns}
              searchPlaceholder="Search featured projects..."
              actions={(project) => (
                <Link href={`/dash/projects/edit/${project.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
              )}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
