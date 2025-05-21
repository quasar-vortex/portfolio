import slugify from "slugify";
import logger from "../logger";
import { AuthenticatedRequestHandler } from "../types";
import {
  CreateProjectModel,
  SearchProjectsModel,
  UpdateProjectModel,
} from "./projects.models";
import { db } from "../db";
import { HttpError } from "../error";
import { Prisma } from "../generated/prisma";

const baseProjectSelect = {
  id: true,
  title: true,
  slug: true,
  description: true,
  isFeatured: true,
  isPublished: true,
  publishDate: true,
  codeUrl: true,
  liveUrl: true,
  content: true,
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      avatarFile: { select: { id: true, url: true } },
    },
  },
  coverImage: {
    select: {
      id: true,
      url: true,
    },
  },
  ProjectTag: {
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

    const existing = await db.project.findUnique({ where: { slug } });
    if (existing)
      throw new HttpError({
        status: "BAD_REQUEST",
        message: `Title, ${title} already in use!`,
      });
    const newProject = await db.$transaction(async (tx) => {
      const foundTags = await tx.tag.findMany({
        where: { id: { in: tags } },
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
          publishDate: isPublished ? new Date() : null,
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
    logger.warn({ error }, "Unable to create project!");
    next(error);
  }
};
const updateProjectHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const projectId = req.params.projectId;
  const isAdmin = req.user!.role === "ADMIN";
  const userId = req.user!.id;
  const meta = { ip: req.ip, method: req.method, url: req.url, userId };

  try {
    if (!isAdmin)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Only an admin may update a project!",
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
    } = req.body as UpdateProjectModel;
    logger.info(meta, "Updating project!");
    const foundProject = await db.project.findUnique({
      where: { id: projectId },
    });
    if (!foundProject)
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Project was not found!",
      });
    const slug = slugify(title).slice(0, 100);
    if (title !== foundProject!.title) {
      const newT = await db.project.findUnique({ where: { title } });
      if (newT)
        throw new HttpError({
          status: "BAD_REQUEST",
          message: `Project title/slug already in use: ${slug}`,
        });
    }
    const updatedProject = await db.$transaction(async (tx) => {
      const foundTags = await tx.tag.findMany({
        where: { id: { in: tags } },
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
      await tx.projectTag.deleteMany({ where: { projectId } });
      const updatedProject = await tx.project.update({
        where: { id: projectId },
        data: {
          slug,
          title,
          description,
          isFeatured,
          isPublished,
          coverImageId,
          codeUrl,
          liveUrl,
          publishDate: isPublished ? new Date() : null,
          content,
          ProjectTag: { createMany: { data: tags.map((t) => ({ tagId: t })) } },
          updatedById: userId,
          updatedDate: new Date(),
        },
        select: adminProjectSelect,
      });
      return updatedProject;
    });
    logger.info(meta, "Project updated!");
    res
      .status(200)
      .json({ data: updatedProject, message: "Project updated successfully!" });
  } catch (error) {
    logger.warn({ error }, "Unable to update project!");
    next(error);
  }
};
const getProjectByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const isAdmin = req.user!.role === "ADMIN";
  const userId = req.user!.id;
  const projectId = req.params.projectId;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
    projectId,
  };

  try {
    logger.info(meta, "Finding project");
    const where: Prisma.ProjectWhereUniqueInput = { id: projectId };
    if (!isAdmin) where.isActive = true;
    const foundProject = await db.project.findUnique({
      where,
      select: isAdmin ? adminProjectSelect : baseProjectSelect,
    });
    logger.info(meta, "Successfully found project");
    if (!foundProject)
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Project was not found!",
      });
    res
      .status(200)
      .json({ data: foundProject, message: "Successfully found project" });
  } catch (error) {
    logger.warn({ error }, "Unable to find project!");
    next(error);
  }
};
const getProjectBySlugHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const isAdmin = req.user!.role === "ADMIN";
  const userId = req.user!.id;
  const slug = req.params.slug;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
    slug,
  };

  try {
    logger.info(meta, "Finding project");
    const where: Prisma.ProjectWhereUniqueInput = { slug: slug };
    if (!isAdmin) where.isActive = true;
    const foundProject = await db.project.findUnique({
      where,
      select: isAdmin ? adminProjectSelect : baseProjectSelect,
    });
    logger.info(meta, "Successfully found project");
    if (!foundProject)
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Project was not found!",
      });
    res
      .status(200)
      .json({ data: foundProject, message: "Successfully found project" });
  } catch (error) {
    logger.warn({ error }, "Unable to find project!");
    next(error);
  }
};
const getManyProjectsHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const isAdmin = req.user?.role === "ADMIN";
    const {
      term,
      tags,
      isFeatured,
      pageIndex = "1",
      pageSize = "10",
    } = req.query as unknown as SearchProjectsModel;

    const trimmedTerm = term?.trim();
    const index = Math.max((parseInt(pageIndex, 10) || 1) - 1, 0);
    const size = Math.min(Math.max(parseInt(pageSize, 10) || 10, 1), 50);
    const searchIsFeatured = isFeatured === "true";

    const where: Prisma.ProjectWhereInput = {};
    if (trimmedTerm) {
      where.OR = [
        { title: { contains: trimmedTerm } },
        { description: { contains: trimmedTerm } },
      ];
    }
    if (tags?.length) {
      where.ProjectTag = { some: { tagId: { in: tags.split(",") } } };
    }
    if (searchIsFeatured) {
      where.isFeatured = true;
    }

    const totalCount = await db.project.count({ where });
    const foundProjects = await db.project.findMany({
      where,
      select: isAdmin
        ? { ...adminProjectSelect, content: false }
        : { ...baseProjectSelect, content: false },
      skip: index * size,
      take: size,
    });

    const totalPages = Math.max(1, Math.ceil(totalCount / size));
    const meta = {
      pageIndex: index + 1,
      pageSize: size,
      totalPages,
      totalCount,
      isFeatured: searchIsFeatured,
    };
    logger.info(
      {
        ip: req.ip,
        method: req.method,
        url: req.url,
        term: trimmedTerm,
        tags,
        ...meta,
        resultCount: foundProjects.length,
      },
      "Found Projects Successfully!"
    );

    res.status(200).json({
      data: foundProjects,
      message: "Found Projects Successfully!",
      meta,
    });

    type PaginationMeta = {
      pageIndex: number;
      pageSize: number;
      totalPages: number;
      totalCount: number;
    };
  } catch (error) {
    logger.warn({ error }, "Unable to find projects!");
    next(error);
  }
};
const deleteProjectByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const pId = req.params.projectId;
  const isAdmin = req.user!.role === "ADMIN";
  const userId = req.user!.id;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
    projcetId: pId,
  };

  try {
    if (!isAdmin)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Only an admin may delete a project!",
      });
    const foundProject = await db.project.findUnique({ where: { id: pId } });
    // set to inactive and after x days delete on a scheduled job
    if (!foundProject) {
      logger.info(meta, "Project was not found!");
      res.status(200).json({ message: "Project was deleted!" });
      return;
    }

    await db.project.update({
      where: { id: pId },
      data: { isActive: false, isFeatured: false, isPublished: false },
    });
    logger.info(meta, "Project was deleted");
    res.status(200).json({ message: `Project ${pId} was deleted!` });
  } catch (error) {
    next(error);
  }
};

export {
  createProjectHandler,
  updateProjectHandler,
  getProjectByIdHandler,
  getProjectBySlugHandler,
  getManyProjectsHandler,
  deleteProjectByIdHandler,
};
