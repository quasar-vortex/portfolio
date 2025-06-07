"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Section from "@/components/shared/section";
import Link from "next/link";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", slug],
    queryFn: () => api.projectService.getProjectBySlug(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Section>
        <Card className="max-w-4xl mx-auto min-h-[max(500px,calc(1/3*100vh))] skeleton-card">
          <div></div>
        </Card>
      </Section>
    );
  }

  if (isError || !data) {
    return (
      <Section>
        <Card className="max-w-4xl mx-auto p-6 text-center">
          <p className="text-red-500">Project not found.</p>
        </Card>
      </Section>
    );
  }
  const { data: project } = data;
  return (
    <Section>
      <Card className="max-w-4xl mx-auto">
        <CardContent>
          <div className="flex justify-end mb-4">
            <Button asChild>
              <Link href="..">Go Back</Link>
            </Button>
          </div>
          <article className="space-y-6">
            <h1 className="text-3xl font-bold">{project.title}</h1>

            <div className="flex gap-4 items-center text-gray-600">
              <Avatar>
                <AvatarImage src={project.author?.avatarFile?.url} />
                <AvatarFallback />
              </Avatar>
              <p className="font-semibold">
                {project.author.firstName} {project.author.lastName}
              </p>
              <span>·</span>
              <p>{new Date(project.createdAt).toLocaleDateString()}</p>
            </div>

            {project.coverImage?.url && (
              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src={project.coverImage.url}
                  alt={project.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}

            <div
              className="prose max-w-none space-y-4"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </article>
        </CardContent>
      </Card>
    </Section>
  );
}
