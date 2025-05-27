"use client";

import Editor from "@/components/editor/Editor";
import Form, { Fields } from "@/components/shared/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React from "react";
import z from "zod";

const createPostModel = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters.")
    .max(100, "Title cannot exceed 100 characters."),
  excerpt: z
    .string()
    .min(2, "Excerpt must be at least 2 characters.")
    .max(250, "Excerpt cannot exceed 250 characters."),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(100_000, "Content must be less than 100,000 characters"),
  tags: z.array(z.string()),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  coverImageId: z.string().optional(),
});
type CreatePostModel = z.infer<typeof createPostModel>;

const postFields: Fields<CreatePostModel> = [
  {
    name: "title",
    label: "Title",
    placeholder: "Enter the title of the post",
    type: "text",
  },
  {
    name: "excerpt",
    label: "Excerpt",
    placeholder: "Enter an excerpt, will be shown on previews for the post...",
    type: "textarea",
  },
  {
    name: "isPublished",
    label: "Publish Post",
    placeholder: "",
    type: "checkbox",
  },
  {
    name: "isFeatured",
    label: "Feature Post",
    placeholder: "",
    type: "checkbox",
    checked: true,
  },
];
const NewPostPage = () => {
  const router = useRouter();
  const goBack = () => {
    router.replace("/dash/posts");
  };
  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create Post</h1>
        <Button className="cursor-pointer" onClick={goBack}>
          Back
        </Button>
      </div>
      <Card>
        <CardContent>
          <Form
            schema={createPostModel}
            fields={postFields}
            onSubmit={() => {}}
          >
            <Editor
              onSave={(con) => {
                alert(con);
              }}
              initialContent="<h1>Hello World</h1>"
            />
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default NewPostPage;
