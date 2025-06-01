"use client";
import { BaseField, Fields } from "@/components/shared/form";
import TagSelector from "@/components/tags/TagSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
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

  tags: z.array(z.string()),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  coverImageId: z.string().optional(),
});
const contentSchema = z
  .string()
  .min(10, "Content must be at least 10 characters")
  .max(100_000, "Content must be less than 100,000 characters");
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
    checked: true,
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<CreatePostModel, "content">>({
    resolver: zodResolver(createPostModel),
    mode: "onTouched",
    defaultValues: postFields.reduce((a, c) => {
      //@ts-ignore
      return {
        ...a,
        //@ts-ignore
        [c.name]:
          c.type === "checkbox" ? (c.value ? true : false) : c.value || "",
      };
    }, {} as any),
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["tags"],
    queryFn: () => fetch(""),
  });
  const renderField = (field: BaseField<CreatePostModel>) => {
    const fieldId = `field-${field.name}`;
    const error = errors[field.name as keyof CreatePostModel]?.message;

    return (
      <div key={field.name} className="flex-1">
        {field.type === "textarea" && (
          <>
            <label htmlFor={fieldId} className="text-gray-600 block mb-2">
              {field.label}
            </label>
            <textarea
              {...register(field.name)}
              id={fieldId}
              rows={8}
              placeholder={field.placeholder}
              className="resize-y w-full border border-gray-300 focus:border-gray-500 duration-200 outline-none p-2 text-lg"
            />
          </>
        )}
        {["text", "email", "password"].includes(field.type) && (
          <>
            <label htmlFor={fieldId} className="text-gray-600 block mb-2">
              {field.label}
            </label>
            <input
              {...register(field.name)}
              id={fieldId}
              type={field.type}
              placeholder={field.placeholder}
              className="w-full border border-gray-300 focus:border-gray-500 duration-200 outline-none p-2 text-lg"
            />
          </>
        )}
        {field.type === "checkbox" && (
          <>
            <div className="flex gap-3 items-center">
              <label
                htmlFor={fieldId}
                className="text-gray-600 whitespace-nowrap block"
              >
                {field.label}
              </label>
              <input
                {...register(field.name)}
                id={fieldId}
                type={field.type}
                placeholder={field.placeholder}
                className=" border border-gray-300 focus:border-gray-500 duration-200 outline-none p-2 text-lg"
              />
            </div>
          </>
        )}
        {error && (
          <span className="text-red-600 font-bold text-sm">
            {String(error)}
          </span>
        )}
      </div>
    );
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
          <form
            onSubmit={handleSubmit((d) => {
              alert(JSON.stringify(d));
            })}
            className="flex flex-col gap-4"
          >
            {postFields.map(renderField)}
            <div>
              <TagSelector />
            </div>
            <Button type="submit" className="mx-auto">
              Create Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default NewPostPage;
