"use client";

import { editorExtensions, MenuBar } from "@/components/editor/Editor";

import TagSelector from "@/components/tags/TagSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditorContent, useEditor } from "@tiptap/react";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import api from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/app/providers/storeProvider";
import FileUploader from "@/components/shared/FileUploader";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { AdminProject } from "@/lib/types";

const updateProjectModel = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(500),
  codeUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  tags: z.array(z.string()),
  isPublished: z.boolean(),
  isFeatured: z.boolean(),
  coverImageId: z.string().optional(),
});

type UpdateProjectModel = z.infer<typeof updateProjectModel>;

const EditProjectPage = () => {
  const { accessToken } = useAuthStore();
  const qc = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const { projectId } = params as { projectId: string };

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<
    { id: string; name: string }[]
  >([]);

  const editor = useEditor({ extensions: editorExtensions, content: "" });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Omit<UpdateProjectModel, "content">>({
    resolver: zodResolver(updateProjectModel),
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
      codeUrl: "",
      liveUrl: "",
      tags: [],
      isPublished: true,
      isFeatured: true,
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: async () =>
      api.projectService.getProjectById(projectId, accessToken!),
    enabled: !!projectId && !!accessToken && !!editor,
  });
  const goBack = useCallback(() => router.replace("/dash/posts"), [router]);
  useEffect(() => {
    if (!isLoading && error) {
      toast.error("Unable to load project");
      console.log(error);
      return goBack();
    }
    if (!accessToken) return router.replace("/login");
    if (data) {
      const { data: project } = data as { data: AdminProject };
      setSelectedTags(project.ProjectTag.map((item) => item.tag));
      reset({
        title: project.title,
        description: project.description,
        coverImageId: project.coverImage?.id,
        isFeatured: project.isFeatured,
        isPublished: project.isPublished,
        tags: project.ProjectTag.map((item) => item.tag.id),
        codeUrl: project.codeUrl,
        liveUrl: project.liveUrl,
      });
      if (project.coverImage) setImageUrl(project.coverImage.url);
      editor?.commands.setContent(project.content);
    }
  }, [
    projectId,
    reset,
    accessToken,
    editor,
    data,
    router,
    error,
    isLoading,
    goBack,
  ]);

  const handleUpdate = async (d: UpdateProjectModel) => {
    try {
      let coverImageId = d.coverImageId;
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
      await api.projectService.updateProject(projectId!, payload, accessToken!);

      qc.invalidateQueries({ queryKey: ["editProject", projectId] });
      qc.invalidateQueries({ queryKey: ["projects"] });
      qc.invalidateQueries({ queryKey: ["manageProjects"] });
      if (d.isFeatured)
        qc.invalidateQueries({ queryKey: ["featuredProjects"] });

      goBack();
    } catch (e) {
      toast.error(
        (e instanceof Error && e.message) || "Failed to update project"
      );
    }
  };

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <Button onClick={goBack}>Back</Button>
      </div>
      <Card>
        <CardContent>
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="flex flex-col gap-4"
          >
            {imageUrl ? (
              <div className="flex justify-center flex-col gap-4 items-center">
                <Image
                  className="object-cover max-h-100 w-full"
                  src={imageUrl}
                  height={400}
                  width={400}
                  alt="cover"
                />
                <Button
                  onClick={() => {
                    setImageUrl("");
                    setValue("coverImageId", undefined);
                  }}
                  type="button"
                  className="cursor-pointer bg-red-500 duration-200 hover:bg-red-600"
                >
                  <FiX /> Delete
                </Button>
              </div>
            ) : (
              <FileUploader onFileUpload={(f) => setCoverImageFile(f)} />
            )}
            <TagSelector
              selectedTags={selectedTags}
              onTagRemoval={(t) =>
                setSelectedTags((prev) => prev.filter((tag) => tag.id !== t.id))
              }
              onTagSelection={(t) =>
                setSelectedTags((prev) =>
                  prev.find((tag) => tag.id === t.id) ? prev : [...prev, t]
                )
              }
            />
            {["title", "description", "codeUrl", "liveUrl"].map((name) => {
              const fieldId = `field-${name}`;
              const error = errors[name as keyof typeof errors]?.message;
              const isTextarea = name === "description";
              return (
                <div key={name} className="flex-1">
                  <label htmlFor={fieldId} className="text-gray-600 block mb-2">
                    {name === "codeUrl"
                      ? "Code URL"
                      : name === "liveUrl"
                      ? "Live URL"
                      : name[0].toUpperCase() + name.slice(1)}
                  </label>
                  {isTextarea ? (
                    <textarea
                      {...register(name)}
                      id={fieldId}
                      rows={3}
                      placeholder=""
                      className="resize-y w-full border border-gray-300 focus:border-gray-500 duration-200 outline-none p-2 text-lg"
                    />
                  ) : (
                    <input
                      {...register(
                        name as "title" | "description" | "codeUrl" | "liveUrl"
                      )}
                      id={fieldId}
                      type="text"
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
              {["isPublished", "isFeatured"].map((name) => (
                <label
                  key={name}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <input
                    {...register(name as "isPublished" | "isFeatured")}
                    id={`field-${name}`}
                    type="checkbox"
                    className="border border-gray-300 focus:border-gray-500 duration-200 outline-none text-lg"
                  />
                  {name === "isPublished"
                    ? "Publish Project"
                    : "Feature Project"}
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
              Update Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default EditProjectPage;
