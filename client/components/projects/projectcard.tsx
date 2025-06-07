import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export type Project = {
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
type ProjectCardProps = Project & {};
const ProjectCard = ({
  title,
  description,
  author,
  codeUrl,
  liveUrl,
  coverImage,
  ProjectTag,
  slug,
}: ProjectCardProps) => {
  return (
    <Card className="h-full flex flex-col justify-between border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-500 transition duration-300 rounded-xl overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-40 md:h-56 w-full relative">
          <Image
            src={coverImage?.url || "https://i.pravatar.cc/500"}
            alt="cover"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-5 pb-0">
          <CardTitle>
            <h3 className="text-xl hover:text-gray-500 duration-200 underline font-semibold text-gray-700 mb-2">
              <Link href={`/projects/${slug}`}>{title}</Link>
            </h3>
            <div className="flex gap-3 items-center mb-2">
              <Avatar>
                <AvatarImage src={author?.avatarFile?.url} />
                <AvatarFallback />
              </Avatar>
              <p className=" text-gray-500  font-bold text-sm">
                {author.firstName} {author.lastName}
              </p>
            </div>
          </CardTitle>
          <CardDescription>
            <ul className="flex flex-wrap gap-2">
              {ProjectTag?.map((t) => (
                <li
                  key={t.tag.id}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 font-semibold rounded-md"
                >
                  {t.tag.name}
                </li>
              ))}
            </ul>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5 text-sm text-gray-600">
        <p>{description}</p>
      </CardContent>
      <CardFooter className="p-5 pt-0 mt-auto flex justify-end gap-4 bg-gradient-to-t from-gray-50 via-transparent">
        {codeUrl && (
          <Button
            className="bg-gray-700 text-white hover:bg-gray-800 transition"
            asChild
          >
            <Link href={codeUrl}>Code</Link>
          </Button>
        )}

        {liveUrl && (
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 transition"
            asChild
          >
            <Link href={liveUrl}>Live</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export { ProjectCard };
