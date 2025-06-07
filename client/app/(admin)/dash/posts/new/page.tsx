"use client";
import { editorExtensions, MenuBar } from "@/components/editor/Editor";
import { BaseField, Fields } from "@/components/shared/form";
import TagSelector from "@/components/tags/TagSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorContent, useEditor } from "@tiptap/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/app/providers/storeProvider";
import FileUploader from "@/components/shared/FileUploader";
const content = "<p>Write about something interesting...</p>";
type Tag = { id: string; name: string };
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
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
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
  const { accessToken } = useAuthStore();
  const qc = useQueryClient();
  const router = useRouter();
  const goBack = () => {
    router.replace("/dash/posts");
  };

  const [postCoverImageFile, setPostCoverImageFile] = useState<File | null>(
    null
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<CreatePostModel, "content">>({
    resolver: zodResolver(createPostModel),
    mode: "onTouched",
    defaultValues: {
      excerpt: "",
      title: "",
      tags: [],
      coverImageId: undefined,
      isFeatured: false,
      isPublished: false,
    },
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
              rows={3}
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
                className="text-gray-600 whitespace-nowrap block w-24"
              >
                {field.label}
              </label>
              <input
                {...register(field.name)}
                id={fieldId}
                type={field.type}
                placeholder={field.placeholder}
                className=" border border-gray-300 focus:border-gray-500 duration-200 outline-none  text-lg"
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

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleAddTag = (t: Tag) => {
    const foundTag = selectedTags.findIndex((item) => item.id === t.id);
    if (foundTag === -1) {
      setSelectedTags((p) => [...p, t]);
    }
  };
  const handleRemoveTag = (t: Tag) => {
    const foundTag = selectedTags.findIndex((item) => item.id === t.id);
    if (foundTag !== -1) {
      setSelectedTags((p) => {
        const oldTags = [...p];
        return oldTags.filter((item) => item.id !== t.id);
      });
    }
  };

  const editor = useEditor({
    extensions: editorExtensions,
    content,
  });

  const handlePostSubmit = async (d: CreatePostModel) => {
    try {
      let coverImageId = undefined;
      if (postCoverImageFile) {
        const fileFormData = new FormData();
        fileFormData.set("image", postCoverImageFile);
        const {
          data: { id },
        } = await api.uploadService.uploadNewFile(fileFormData, accessToken!);
        coverImageId = id;
      }
      const { title, excerpt, isFeatured, isPublished } = d;
      const tags = selectedTags.map((item) => item.id);

      const content = editor!.getHTML();
      const postPayload = {
        title,
        excerpt,
        isFeatured,
        isPublished,
        tags,
        coverImageId,
        content,
      };
      await api.postService.createPost(postPayload, accessToken!);
      qc.invalidateQueries({ queryKey: ["posts", 1, 10, ""] });
      qc.invalidateQueries({ queryKey: ["managePosts"] });
      if (isFeatured) qc.invalidateQueries({ queryKey: ["featuredPosts"] });
      return goBack();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something Went Wrong, Unable to Create Post!",
        {
          position: "top-left",
        }
      );
    }
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
            onSubmit={handleSubmit(handlePostSubmit)}
            className="flex flex-col gap-4"
          >
            <FileUploader
              onFileUpload={(f) => {
                setPostCoverImageFile(f);
              }}
            />
            <div className="">
              <TagSelector
                selectedTags={selectedTags}
                onTagRemoval={handleRemoveTag}
                onTagSelection={handleAddTag}
              />
            </div>
            {postFields.slice(0, 2).map(renderField)}

            {editor && (
              <div className="">
                <MenuBar editor={editor} />
                <EditorContent
                  className="[&>*]:min-h-75 overflow-hidden [&>*]:py-4 [&>*]:px-2 border-gray-300 rounded-b-sm [&>*]:duration-200 [&>*]:outline-none [&>*]:border-2 [&>*]:border-gray-300 [&>*]:focus:border-gray-500 duration-200"
                  editor={editor}
                />
              </div>
            )}

            <div className="flex">{postFields.slice(2).map(renderField)}</div>

            <Button
              size={"lg"}
              type="submit"
              className="mx-auto font-bold cursor-pointer"
            >
              Create Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default NewPostPage;
