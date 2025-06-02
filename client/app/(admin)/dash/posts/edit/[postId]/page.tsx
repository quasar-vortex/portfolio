"use client";
import { editorExtensions, MenuBar } from "@/components/editor/Editor";
import { BaseField, Fields } from "@/components/shared/form";
import TagSelector from "@/components/tags/TagSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorContent, useEditor } from "@tiptap/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/app/providers/storeProvider";
import FileUploader from "@/components/shared/FileUploader";
import Image from "next/image";
import { FiX } from "react-icons/fi";
const content =
  '<h2 class="text-2xl sm:text-3xl font-bold">Try Writing Something</h2><p class="text-gray-700"><strong>Anything at all</strong></p><p class="text-gray-700"></p><ul class="list-disk  text-gray-800"><li class="pl-4 text-gray-800"><p class="text-gray-700">here is a list of items</p></li><li class="pl-4 text-gray-800"><p class="text-gray-700">to review</p></li></ul><p class="text-gray-700"></p><p class="text-gray-700"><code class="bg-[#1e1e1e] text-green-300 font-mono text-sm leading-relaxed p-4 block rounded-lg overflow-x-auto whitespace-pre">function greeeting(user: string) {</code></p><p class="text-gray-700"><code class="bg-[#1e1e1e] text-green-300 font-mono text-sm leading-relaxed p-4 block rounded-lg overflow-x-auto whitespace-pre">alert(`Good Morning ${user}`)</code></p><p class="text-gray-700"><code class="bg-[#1e1e1e] text-green-300 font-mono text-sm leading-relaxed p-4 block rounded-lg overflow-x-auto whitespace-pre">}</code></p><p class="text-gray-700"></p><blockquote class="border-l-4 border-gray-400 pl-4 italic text-gray-700"><p class="text-gray-700">Here is a really awesome quote</p></blockquote>';
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
const EditPostPage = () => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const editor = useEditor({
    extensions: editorExtensions,
    content,
  });

  const { accessToken } = useAuthStore();
  const qc = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const { postId } = params;

  const goBack = () => {
    router.replace("/dash/posts");
  };
  const [postCoverImageFile, setPostCoverImageFile] = useState<File | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Omit<CreatePostModel, "content">>({
    resolver: zodResolver(createPostModel),
    mode: "onTouched",
    defaultValues: {
      excerpt: "",
      title: "",
      tags: [],
      coverImageId: undefined,
      isFeatured: true,
      isPublished: true,
    },
  });

  useEffect(() => {
    (async function getData() {
      try {
        const post = await api.postService.getPostById(
          postId as string,
          accessToken!
        );

        const { data } = post;

        setSelectedTags(data.PostTag.map((item) => item.tag));
        reset({
          title: data.title,
          excerpt: data.excerpt,
          coverImageId: data.coverImage?.id,
          isFeatured: data.isFeatured,
          isPublished: data.isPublished,
          tags: data.PostTag.map((item) => item.tag.id),
        });
        if (data.coverImage) setImageUrl(data.coverImage.url);
        editor?.commands.setContent(data.content);
      } catch (error) {
        console.error("Unable to get post details", error);
        toast.error("Unable to get post details!");
      }
    })();
  }, [postId, reset, accessToken, editor]);

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

  const handlePostSubmit = async (d: CreatePostModel) => {
    try {
      let coverImageId = d.coverImageId;
      if (postCoverImageFile) {
        const fileFormData = new FormData();
        fileFormData.set("image", postCoverImageFile);
        const {
          data: { id },
        } = await api.uploadService.uploadNewFile(fileFormData, accessToken!);
        coverImageId = id;
      }
      const { title, excerpt, isFeatured, isPublished } = d;
      if (isFeatured && !isPublished) {
        toast.error("Post must be published to feature!");
        return;
      }
      const tags = selectedTags.map((item) => item.id);

      const content = editor!.getHTML();
      const postPayload = {
        title,
        excerpt,
        isFeatured,
        isPublished: isPublished === undefined ? false : true,
        tags,
        coverImageId,
        content,
      };

      await api.postService.updatePost(
        postId as string,
        postPayload,
        accessToken!
      );
      qc.invalidateQueries({ queryKey: ["posts"] });
      qc.invalidateQueries({ queryKey: ["managePosts"] });
      if (isFeatured) qc.invalidateQueries({ queryKey: ["featuredPosts"] });
      return goBack();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something Went Wrong, Unable to Update Post!"
      );
    }
  };

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Post</h1>
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
            {imageUrl ? (
              <div className="flex justify-center flex-col gap-4 items-center">
                <Image src={imageUrl} height={200} width={200} alt="cover" />
                <Button
                  onClick={() => {
                    setImageUrl("");
                  }}
                  type="button"
                  className="cursor-pointer bg-red-500 duration-200 hover:bg-red-600"
                >
                  <FiX /> Delete
                </Button>
              </div>
            ) : (
              <FileUploader
                onFileUpload={(f) => {
                  setPostCoverImageFile(f);
                }}
              />
            )}
            {postFields.slice(0, 2).map(renderField)}

            {editor && (
              <div className="">
                <MenuBar editor={editor} />
                <EditorContent
                  className=" overflow-hidden [&>*]:py-4 [&>*]:px-2 border-gray-300 rounded-b-sm [&>*]:duration-200 [&>*]:outline-none [&>*]:border-2 [&>*]:border-gray-300 [&>*]:focus:border-gray-500 duration-200"
                  editor={editor}
                />
              </div>
            )}
            <div className="">
              <TagSelector
                selectedTags={selectedTags}
                onTagRemoval={handleRemoveTag}
                onTagSelection={handleAddTag}
              />
            </div>
            <div className="flex">{postFields.slice(2).map(renderField)}</div>

            <Button type="submit" className="mx-auto">
              Edit Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default EditPostPage;
