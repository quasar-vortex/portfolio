import { notFound } from "next/navigation";
import api from "@/lib/api";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Section from "@/components/shared/section";
import Link from "next/link";

type Params = Promise<{ slug: string }>;

export default async function PostDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const { data: post } = await api.postService.getPostBySlug(slug);

  if (!post) return notFound();

  return (
    <Section>
      <Card className="max-w-4xl mx-auto">
        <CardContent>
          <div className="flex justify-end">
            <Button asChild>
              <Link href="/posts">Go Back</Link>
            </Button>
          </div>
          <article className="p-6 max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">{post.title}</h1>

            <div className="flex gap-4 items-center text-gray-600">
              <Avatar>
                <AvatarImage src={post.author?.avatarFile?.url} />
                <AvatarFallback />
              </Avatar>
              <p className="font-semibold">
                {post.author.firstName} {post.author.lastName}
              </p>
              <span>·</span>
              <p>{new Date(post.publishDate!).toLocaleDateString()}</p>
            </div>

            {post.coverImage?.url && (
              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src={post.coverImage.url}
                  alt={post.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}

            <div
              className="prose max-w-none space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="flex flex-wrap gap-2 pt-4">
              {post.PostTag?.map(
                ({ tag }: { tag: { id: string; name: string } }) => (
                  <span
                    key={tag.id}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md"
                  >
                    {tag.name}
                  </span>
                )
              )}
            </div>
          </article>
        </CardContent>
      </Card>
    </Section>
  );
}
