import { notFound, redirect } from "next/navigation";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Section from "@/components/shared/section";
import Link from "next/link";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let project = null;
  let slug = null;

  try {
    const { slug: sl } = await params;
    slug = sl;

    const res = await fetch(`${process.env.API_URL}/projects/slug/${slug}`, {
      cache: "no-store",
    });

    if (res.status === 404) return notFound();
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);

    const data = await res.json();
    project = data.data;
  } catch (error) {
    console.error("Fetch error:", error);
    return redirect("/projects");
  }

  return (
    <Section>
      <Card className="max-w-4xl mx-auto">
        <CardContent>
          <div className="flex justify-end mb-4">
            <Button asChild>
              <Link href="/projects">Go Back</Link>
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
