"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ProjectCard } from "./projectcard";
import { Button } from "../ui/button";
import Link from "next/link";
import Section from "../shared/section";
import { Card } from "../ui/card";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import api from "@/lib/api";

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  isFeatured: boolean;
  isPublished: boolean;
  publishDate: Date;
  codeUrl: string | null;
  liveUrl: string | null;
  content: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    avatarFile: {
      id: string;
      url: string;
    } | null;
  };
  coverImage: {
    id: string;
    url: string;
  } | null;
  ProjectTag: Array<{
    tag: {
      id: string;
      name: string;
    };
  }>;
};

const FeaturedProjects = ({ bgGray }: { bgGray?: boolean }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredProjects"],
    queryFn: async () =>
      api.projectService.getManyProjects({ isFeatured: true }),
  });

  return (
    <Section bgGray={bgGray} title="Featured Projects">
      {error && (
        <Alert className="mb-6 text-red-600 font-bold shadow-md">
          <AlertTitle>
            <h4 className="font-bold text-lg sm:text-xl">
              Unable to Load Projects
            </h4>
          </AlertTitle>
          {error?.message && (
            <AlertDescription>{error.message}</AlertDescription>
          )}
        </Alert>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((item: Project) => {
          return <ProjectCard key={item.id} {...item} />;
        })}
        {isPending &&
          !data &&
          Array(3)
            .fill(null)
            .map((item, idx) => (
              <Card
                key={idx}
                className="min-h-[max(500px,calc(1/3*100vh))] skeleton-card"
              >
                <div></div>
              </Card>
            ))}
      </div>
      <div className="text-center mt-10">
        <Button asChild variant="outline">
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    </Section>
  );
};

export { FeaturedProjects };
