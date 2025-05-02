import slugify from "slugify";
import logger from "../logger";
import { AuthenticatedRequestHandler } from "../types";
import { CreateProjectModel } from "./projects.models";
import { db } from "../db";
import { HttpError } from "../error";

const baseProjectSelect = {
  id: true,
  authorId: true,
  title: true,
  slug: true,
  description: true,
  isFeatured: true,
  isPublished: true,
  coverImageId: true,
  publishDate: true,
  codeUrl: true,
  liveUrl: true,
  content: true,
  ProjectTag: {
    where: { tag: { isActive: true } },
    include: { tag: { select: { id: true, name: true } } },
  },
};
const adminProjectSelect = {
  ...baseProjectSelect,
  isActive: true,
  updatedBy: true,
  updatedById: true,
  updatedDate: true,
  createdDate: true,
};
const createProjectHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const isAdmin = req.user!.role === "ADMIN";
  const userId = req.user!.id;
  const meta = { ip: req.ip, method: req.method, url: req.url, userId };

  try {
    if (!isAdmin)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Only an admin may create a project!",
      });

    const {
      title,
      description,
      isFeatured,
      isPublished,
      coverImageId,
      tags,
      content,
      codeUrl,
      liveUrl,
    } = req.body as CreateProjectModel;
    logger.info(meta, "Creating new project!");

    const slug = slugify(title).slice(0, 100);
    const newProject = await db.$transaction(async (tx) => {
      const foundTags = await tx.tag.findMany({
        where: { id: { in: tags }, isActive: true },
      });
      // Verify tag Ids
      if (foundTags.length !== tags.length) {
        const tagMap = new Map();
        for (let found of foundTags) {
          tagMap.set(found.id, found);
        }
        for (let tagId of tags) {
          if (!tagMap.has(tagId)) {
            throw new HttpError({
              status: "BAD_REQUEST",
              message: `Invalid tag id: ${tagId}`,
            });
          }
        }
      }
      const newProject = await tx.project.create({
        data: {
          authorId: userId,
          slug,
          title,
          description,
          isFeatured,
          isPublished,
          coverImageId,
          codeUrl,
          liveUrl,
          publishDate: isPublished ? new Date().toISOString() : null,
          ProjectTag: { createMany: { data: tags.map((t) => ({ tagId: t })) } },
          content,
        },
        select: adminProjectSelect,
      });
      return newProject;
    });
    logger.info(meta, "Project created!");
    res
      .status(201)
      .json({ data: newProject, message: "Project created successfully!" });
  } catch (error) {
    next(error);
  }
};
const updateProjectHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  try {
  } catch (error) {
    next(error);
  }
};
const getProjectByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  try {
  } catch (error) {
    next(error);
  }
};
const getManyProjectsHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  try {
    // content false
  } catch (error) {
    next(error);
  }
};
export {};
