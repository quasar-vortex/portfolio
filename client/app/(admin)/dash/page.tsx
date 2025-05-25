"use client";
import { Post } from "@/components/posts/featuredposts";
import { PostCard } from "@/components/posts/postcard";
import PostsTable from "@/components/posts/PostsTable";
import { Project } from "@/components/projects/projectcard";
import ProjectsTable from "@/components/projects/ProjectsTable";
import Protected from "@/components/shared/Protected";
import Spinner from "@/components/shared/Spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeaturedPosts, getFeaturedProjects } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const DashBoard = () => {
  const {
    isPending: postsPending,
    error: postsError,
    data: featuredPosts,
  } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: getFeaturedPosts,
  });
  const {
    isPending: projectsPending,
    error: projectsError,
    data: featuredProjects,
  } = useQuery({
    queryKey: ["featuredProjects"],
    queryFn: getFeaturedProjects,
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
          {!postsPending && <PostsTable posts={featuredPosts?.data} />}
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
            <ProjectsTable projects={featuredProjects?.data} />
          )}
        </div>
      </div>
    </section>
  );
};

export default DashBoard;
