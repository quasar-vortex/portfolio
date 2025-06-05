// NewProjectPage.tsx (refactored styling)

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

const content = "<p>Write about the project...</p>";

const createProjectModel = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(500),
  codeUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  tags: z.array(z.string()),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
  coverImageId: z.string().optional(),
});

const contentSchema = z
  .string()
  .min(10, "Content must be at least 10 characters")
  .max(100_000);

type CreateProjectModel = z.infer<typeof createProjectModel>;

const projectFields: Fields<CreateProjectModel> = [
  { name: "title", label: "Title", placeholder: "Project title", type: "text" },
  {
    name: "description",
    label: "Description",
    placeholder: "Short description...",
    type: "textarea",
  },
  {
    name: "codeUrl",
    label: "Code URL",
    placeholder: "https://github.com/...",
    type: "text",
  },
  {
    name: "liveUrl",
    label: "Live URL",
    placeholder: "https://...",
    type: "text",
  },
  {
    placeholder: "",
    name: "isPublished",
    label: "Publish Project",
    type: "checkbox",
    checked: true,
  },
  {
    placeholder: "",
    name: "isFeatured",
    label: "Feature Project",
    type: "checkbox",
    checked: true,
  },
];

const NewProjectPage = () => {
  const { accessToken } = useAuthStore();
  const qc = useQueryClient();
  const router = useRouter();

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<
    { id: string; name: string }[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<CreateProjectModel, "content">>({
    resolver: zodResolver(createProjectModel),
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
      codeUrl: "",
      liveUrl: "",
      tags: [],
      isFeatured: false,
      isPublished: false,
      coverImageId: undefined,
    },
  });

  const editor = useEditor({ extensions: editorExtensions, content });

  const goBack = () => router.replace("/dash/projects");

  const handleCreate = async (d: CreateProjectModel) => {
    try {
      let coverImageId;
      if (coverImageFile) {
        const formData = new FormData();
        formData.set("image", coverImageFile);
        const { data } = await api.uploadService.uploadNewFile(
          formData,
          accessToken!
        );
        coverImageId = data.id;
      }

      const content = editor?.getHTML() || "";
      const payload = {
        ...d,
        tags: selectedTags.map((t) => t.id),
        coverImageId,
        content,
      };
      await api.projectService.createProject(payload, accessToken!);

      qc.invalidateQueries({ queryKey: ["projects", 1, 10, ""] });
      qc.invalidateQueries({ queryKey: ["manageProjects"] });
      if (d.isFeatured)
        qc.invalidateQueries({ queryKey: ["featuredProjects"] });

      goBack();
    } catch (e: any) {
      toast.error(e?.message || "Failed to create project");
    }
  };

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create Project</h1>
        <Button onClick={goBack}>Back</Button>
      </div>
      <Card>
        <CardContent>
          <form
            onSubmit={handleSubmit(handleCreate)}
            className="flex flex-col gap-4"
          >
            <FileUploader onFileUpload={setCoverImageFile} />
            <TagSelector
              selectedTags={selectedTags}
              onTagSelection={(t) => setSelectedTags((prev) => [...prev, t])}
              onTagRemoval={(t) =>
                setSelectedTags((prev) => prev.filter((tag) => tag.id !== t.id))
              }
            />
            {projectFields.slice(0, 4).map((f) => {
              const fieldId = `field-${f.name}`;
              const error = errors[f.name as keyof typeof errors]?.message;
              return (
                <div key={f.name} className="flex-1">
                  <label htmlFor={fieldId} className="text-gray-600 block mb-2">
                    {f.label}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      {...register(f.name)}
                      id={fieldId}
                      placeholder={f.placeholder}
                      className="resize-y w-full border border-gray-300 focus:border-gray-500 duration-200 outline-none p-2 text-lg"
                    />
                  ) : (
                    <input
                      {...register(f.name)}
                      id={fieldId}
                      type="text"
                      placeholder={f.placeholder}
                      className="w-full border border-gray-300 focus:border-gray-500 duration-200 outline-none p-2 text-lg"
                    />
                  )}
                  {error && (
                    <p className="text-red-600 text-sm font-bold">
                      {String(error)}
                    </p>
                  )}
                </div>
              );
            })}
            <div className="flex gap-4">
              {projectFields.slice(4).map((f) => (
                <label
                  key={f.name}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <input
                    {...register(f.name)}
                    id={`field-${f.name}`}
                    type="checkbox"
                    className="border border-gray-300 focus:border-gray-500 duration-200 outline-none text-lg"
                  />
                  {f.label}
                </label>
              ))}
            </div>
            {editor && (
              <div>
                <MenuBar editor={editor} />
                <EditorContent
                  className="[&>*]:min-h-75 overflow-hidden [&>*]:py-4 [&>*]:px-2 border-gray-300 rounded-b-sm [&>*]:duration-200 [&>*]:outline-none [&>*]:border-2 [&>*]:border-gray-300 [&>*]:focus:border-gray-500 duration-200"
                  editor={editor}
                />
              </div>
            )}
            <Button type="submit" className="mx-auto font-bold cursor-pointer">
              Create Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default NewProjectPage;
