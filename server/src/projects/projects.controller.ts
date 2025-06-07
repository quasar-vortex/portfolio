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

    if (isFeatured && !isPublished) {
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "Only published projects may be featured!",
      });
    }

    if (coverImageId) {
      const foundImage = await db.file.findUnique({
        where: { id: coverImageId },
      });
      if (!foundImage) {
        throw new HttpError({
          status: "BAD_REQUEST",
          message: "Cover image does not exist!",
        });
      }
    }

    const newProject = await db.$transaction(async (tx) => {
      const foundTags = await tx.tag.findMany({
        where: { id: { in: tags } },
      });

      if (foundTags.length !== tags.length) {
        const tagMap = new Set(foundTags.map((t) => t.id));
        for (const tagId of tags) {
          if (!tagMap.has(tagId)) {
            throw new HttpError({
              status: "BAD_REQUEST",
              message: `Invalid tag id: ${tagId}`,
            });
          }
        }
      }

      if (isFeatured) {
        const featuredProjects = await tx.project.findMany({
          where: { isFeatured: true },
          orderBy: { publishDate: "asc" },
        });

        if (featuredProjects.length >= 3) {
          await tx.project.update({
            where: { id: featuredProjects[0].id },
            data: { isFeatured: false },
          });
        }
      }

      return await tx.project.create({
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
          content,
          ProjectTag: {
            createMany: { data: tags.map((tagId) => ({ tagId })) },
          },
        },
        select: adminProjectSelect,
      });
    });

    logger.info({ ...meta, projectId: newProject.id }, "Project created!");
    res.status(201).json({
      data: newProject,
      message: "Project created successfully!",
    });
  } catch (error) {
    logger.warn({ error, ...meta }, "Unable to create project!");
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
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
    projectId,
  };

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

    logger.info(meta, "Updating project");

    const foundProject = await db.project.findUnique({
      where: { id: projectId },
    });
    if (!foundProject)
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Project was not found!",
      });

    const slug = slugify(title).slice(0, 100);
    if (title !== foundProject.title) {
      const existingSlug = await db.project.findUnique({ where: { slug } });
      if (existingSlug)
        throw new HttpError({
          status: "BAD_REQUEST",
          message: `Project title/slug already in use: ${slug}`,
        });
    }

    if (isFeatured && !isPublished) {
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "Only published projects may be featured!",
      });
    }

    if (coverImageId) {
      const foundImage = await db.file.findUnique({
        where: { id: coverImageId },
      });
      if (!foundImage) {
        throw new HttpError({
          status: "BAD_REQUEST",
          message: "Cover image does not exist!",
        });
      }
    }

    const updatedProject = await db.$transaction(async (tx) => {
      const foundTags = await tx.tag.findMany({
        where: { id: { in: tags } },
      });

      if (foundTags.length !== tags.length) {
        const tagSet = new Set(foundTags.map((t) => t.id));
        for (const tagId of tags) {
          if (!tagSet.has(tagId)) {
            throw new HttpError({
              status: "BAD_REQUEST",
              message: `Invalid tag id: ${tagId}`,
            });
          }
        }
      }

      await tx.projectTag.deleteMany({ where: { projectId } });

      if (isFeatured) {
        const featuredProjects = await tx.project.findMany({
          where: { isFeatured: true },
          orderBy: { publishDate: "asc" },
        });

        if (featuredProjects.length >= 3 && !foundProject.isFeatured) {
          await tx.project.update({
            where: { id: featuredProjects[0].id },
            data: { isFeatured: false },
          });
        }
      }

      return await tx.project.update({
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
          publishDate: isPublished
            ? foundProject.publishDate ?? new Date()
            : null,
          content,
          ProjectTag: {
            createMany: {
              data: tags.map((tagId) => ({ tagId })),
            },
          },
          updatedById: userId,
          updatedDate: new Date(),
        },
        select: adminProjectSelect,
      });
    });

    logger.info({ ...meta, projectId: updatedProject.id }, "Project updated!");
    res.status(200).json({
      data: updatedProject,
      message: "Project updated successfully!",
    });
  } catch (error) {
    logger.warn({ error, ...meta }, "Unable to update project!");
    next(error);
  }
};

const getProjectByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const projectId = req.params.projectId;
  const isAdmin = req.user?.role === "ADMIN";
  const userId = req.user?.id;

  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
    projectId,
  };

  try {
    logger.info(meta, "Locating project");

    const where = isAdmin
      ? { id: projectId }
      : { id: projectId, isActive: true, isPublished: true };

    const select = isAdmin ? adminProjectSelect : baseProjectSelect;

    const foundProject = await db.project.findUnique({
      where,
      select: { ...select, content: true },
    });

    if (!foundProject) {
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Project was not found!",
      });
    }

    logger.info(meta, "Project was found");
    res.status(200).json({
      message: "Project was found!",
      data: foundProject,
    });
  } catch (error) {
    logger.warn({ ...meta, error }, "Unable to get project");
    next(error);
  }
};

const getProjectBySlugHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const slug = req.params.slug!;
  const userId = req.user?.id;

  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
    slug,
  };

  try {
    logger.info(meta, "Locating project by slug");

    const where = { slug, isActive: true, isPublished: true };

    const select = baseProjectSelect;

    const foundProject = await db.project.findUnique({
      where,
      select: { ...select, content: true },
    });

    if (!foundProject) {
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Project was not found!",
      });
    }

    logger.info(meta, "Project was found");
    res.status(200).json({
      message: "Project was found!",
      data: foundProject,
    });
  } catch (error) {
    logger.warn({ ...meta, error }, "Unable to get project by slug");
    next(error);
  }
};

const getManyProjectsHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const isAdmin = req.user?.role === "ADMIN";
  const userId = req.user?.id;

  const meta = { ip: req.ip, method: req.method, url: req.url, userId };

  try {
    logger.info(meta, "Fetching many projects");

    const {
      term,
      tags,
      isFeatured,
      pageIndex = "1",
      pageSize = "10",
      sortOrder,
      sortKey,
    } = req.query as unknown as SearchProjectsModel;

    const trimmedTerm = term?.trim();
    const index = Math.max(parseInt(pageIndex) - 1 || 0, 0);
    const size = Math.min(Math.max(parseInt(pageSize) || 10, 1), 50);
    const select = isAdmin ? adminProjectSelect : baseProjectSelect;

    const order: "asc" | "desc" = sortOrder === "asc" ? "asc" : "desc";
    const key: string = sortKey || "publishDate";

    const where: Prisma.ProjectWhereInput = {};
    const andConditions: Prisma.ProjectWhereInput[] = [];

    if (!isAdmin) {
      where.isPublished = true;
      where.isActive = true;
    }

    if (tags?.length) {
      where.ProjectTag = {
        some: {
          tag: {
            id: { in: tags.split(",") },
          },
        },
      };
    }

    if (trimmedTerm) {
      andConditions.push({
        OR: [
          { title: { contains: trimmedTerm } },
          { description: { contains: trimmedTerm } },
        ],
      });
    }

    const searchIsFeatured =
      isFeatured === "true" ? true : isFeatured === "false" ? false : undefined;
    if (searchIsFeatured !== undefined) {
      andConditions.push({ isFeatured: searchIsFeatured });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    const [count, foundProjects] = await Promise.all([
      db.project.count({ where }),
      db.project.findMany({
        where,
        skip: index * size,
        take: size,
        orderBy: { [key]: order },
        select: { ...select, content: false },
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(count / size));

    logger.info(
      {
        ...meta,
        pageIndex: index + 1,
        pageSize: size,
        totalCount: count,
        totalPages,
        isFeatured: searchIsFeatured,
      },
      "Found projects"
    );

    res.status(200).json({
      data: foundProjects,
      message: "Found projects!",
      meta: {
        pageIndex: index + 1,
        pageSize: size,
        totalCount: count,
        totalPages,
      },
    });
  } catch (error) {
    logger.warn({ ...meta, error }, "Unable to get projects");
    next(error);
  }
};

const deleteProjectByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const projectId = req.params.projectId;
  const isAdmin = req.user!.role === "ADMIN";
  const userId = req.user!.id;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
    projectId,
  };

  try {
    logger.info(meta, "Deleting project");

    if (!isAdmin)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Only an admin may delete a project!",
      });

    const foundProject = await db.project.findUnique({
      where: { id: projectId },
    });

    const completeDelete = () => {
      logger.info(meta, "Project deleted");
      res.status(200).json({ message: "Project was deleted!" });
    };

    if (!foundProject) {
      completeDelete();
      return;
    }

    await db.project.update({
      where: { id: projectId },
      data: {
        isActive: false,
        isFeatured: false,
        isPublished: false,
      },
    });

    completeDelete();
  } catch (error) {
    logger.warn({ ...meta, error }, "Unable to delete project");
    next(error);
  }
};

const toggleProjectFeatured: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const projectId = req.params.projectId;
  const userId = req.user!.id;
  const isAdmin = req.user!.role === "ADMIN";
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
    projectId,
  };

  try {
    logger.info(meta, "Toggling project as featured");

    if (!isAdmin) {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be admin to toggle featured projects.",
      });
    }

    const project = await db.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Project not found!",
      });
    }

    if (project.isFeatured) {
      await db.project.update({
        where: { id: projectId },
        data: { isFeatured: false },
      });
      logger.info(meta, "Project unfeatured");
      return res.status(200).json({ message: "Project unfeatured." });
    }

    const featuredProjects = await db.project.findMany({
      where: { isFeatured: true },
      orderBy: { publishDate: "asc" },
    });

    await db.$transaction(async (tx) => {
      if (featuredProjects.length >= 3) {
        await tx.project.update({
          where: { id: featuredProjects[0].id },
          data: { isFeatured: false },
        });
      }

      await tx.project.update({
        where: { id: projectId },
        data: { isFeatured: true },
      });
    });

    logger.info(meta, "Project featured");
    res.status(200).json({ message: "Project featured." });
  } catch (error) {
    logger.warn({ ...meta, error }, "Error toggling project featured");
    next(error);
  }
};

const toggleProjectPublished: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const projectId = req.params.projectId;
  const userId = req.user!.id;
  const isAdmin = req.user!.role === "ADMIN";
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    projectId,
    userId,
  };

  try {
    logger.info(meta, "Toggling project published status");

    if (!isAdmin) {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be admin to toggle published status.",
      });
    }

    const project = await db.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Project not found!",
      });
    }

    const newStatus = !project.isPublished;
    const shouldSetPublishDate = !project.isPublished && newStatus;

    await db.project.update({
      where: { id: projectId },
      data: {
        isPublished: newStatus,
        publishDate: shouldSetPublishDate ? new Date() : null,
      },
    });

    logger.info(meta, `Project ${newStatus ? "published" : "unpublished"}`);
    res.status(200).json({
      message: `Project successfully ${
        newStatus ? "published" : "unpublished"
      }.`,
    });
  } catch (error) {
    logger.warn({ ...meta, error }, "Error toggling published status");
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
  toggleProjectFeatured,
  toggleProjectPublished,
};
