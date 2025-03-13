import { Project } from "@prisma/client";
import { db } from "../db";
import HttpError from "../error";
import {
  CreateNewProjectModel,
  UpdateProjectModel,
  QueryProjectsModel,
} from "../models/projectModels";
import { apiUtils, asyncHandler } from "../utils";
import slugify from "slugify";
import fileUtils from "../utils/fileUtils";
import logger from "../logger";

const { formatApiRespone } = apiUtils;

const baseProjectSelect = {
  id: true,
  title: true,
  description: true,
  slug: true,
  coverImg: { select: { id: true, url: true } },
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
  },
  isPublished: true,
  productionUrl: true,
  codeUrl: true,
  isFeatured: true,
};

const createNewProjectHandler = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    coverImageId,
    productionUrl,
    codeUrl,
    isPublished,
    tags,
  } = req.body as CreateNewProjectModel;
  const authorId = req.user!.id;

  logger.info({ authorId, title }, "Creating new project");

  // Find existing tags or create new ones
  const foundTags = await db.tag.findMany({ where: { name: { in: tags } } });
  const newTags = await Promise.all(
    tags
      .filter((t) => !foundTags.some((tag) => tag.name === t))
      .map((t) => db.tag.create({ data: { name: t } }))
  );
  const allTags = [...foundTags, ...newTags];

  const newProject = await db.project.create({
    data: {
      authorId,
      title,
      slug: slugify(title).slice(0, 100),
      description,
      coverImageId,
      productionUrl,
      codeUrl,
      isPublished,
      isFeatured: false,
      ProjectTag: {
        createMany: { data: allTags.map((tag) => ({ tagId: tag.id })) },
      },
    },
    select: { ...baseProjectSelect, dateCreated: true, dateUpdated: true },
  });

  res
    .status(201)
    .json(formatApiRespone(newProject, 201, "New Project Created!"));
});

const editProjectHandler = (isAdmin: boolean) =>
  asyncHandler(async (req, res, next) => {
    const userId = req.user!.id;
    const projectId = req.params.projectId;
    const {
      title,
      description,
      coverImageId,
      productionUrl,
      codeUrl,
      isPublished,
      isFeatured,
      tags,
    } = req.body as UpdateProjectModel;

    logger.info({ projectId, userId }, "Editing project request received");

    const foundProject = await db.project.findUnique({
      where: { id: projectId },
      include: { ProjectTag: true, coverImg: true },
    });

    if (!foundProject) {
      throw new HttpError({
        statusMessage: "BAD_REQUEST",
        message: "Project does not exist.",
      });
    }

    if (!isAdmin && foundProject.authorId !== userId) {
      throw new HttpError({
        statusMessage: "FORBIDDEN",
        message: "Unauthorized project update attempt.",
      });
    }

    const updatePayload: Partial<Project> = {
      title,
      description,
      productionUrl,
      codeUrl,
      isPublished,
    };

    // Handle cover image updates
    if (coverImageId && coverImageId !== foundProject.coverImageId) {
      if (foundProject.coverImg) {
        logger.info(
          { projectId, oldCoverImageId: foundProject.coverImageId },
          "Cleaning up old cover image"
        );
        await fileUtils.deleteFile(foundProject.coverImg.key);
        await db.file.delete({ where: { id: foundProject.coverImg.id } });
      }
      updatePayload.coverImageId = coverImageId;
    } else if (!coverImageId) {
      updatePayload.coverImageId = null;
    }

    // Ensure max 3 featured projects
    if (isAdmin && isFeatured) {
      await db.$transaction(async (tx) => {
        const count = await tx.project.count({ where: { isFeatured: true } });
        if (count === 3) {
          const oldestFeatured = await tx.project.findFirst({
            where: { isFeatured: true },
            orderBy: { publishDate: "asc" },
          });
          if (oldestFeatured) {
            await tx.project.update({
              where: { id: oldestFeatured.id },
              data: { isFeatured: false },
            });
          }
        }
        await tx.project.update({
          where: { id: projectId },
          data: { isFeatured: true },
        });
      });
    } else if (!isFeatured && foundProject.isFeatured) {
      await db.project.update({
        where: { id: foundProject.id },
        data: { isFeatured: false },
      });
    }

    // Tag management with upsert for efficiency
    if (tags) {
      await db.$transaction(async (tx) => {
        await tx.projectTag.deleteMany({ where: { projectId } });

        const allTags = await Promise.all(
          tags.map(async (tagName) => {
            return await tx.tag.upsert({
              where: { name: tagName },
              update: {},
              create: { name: tagName },
            });
          })
        );

        await tx.projectTag.createMany({
          data: allTags.map((tag) => ({ projectId, tagId: tag.id })),
        });
      });
    }

    // Update project details
    const updatedProject = await db.project.update({
      where: { id: projectId },
      data: updatePayload,
      select: baseProjectSelect,
    });

    res
      .status(200)
      .json(
        formatApiRespone(updatedProject, 200, "Project Updated Successfully!")
      );
  });

const deleteProjectByIdHandler = (isAdmin: boolean) =>
  asyncHandler(async (req, res, next) => {
    const userId = req.user!.id;
    const projectId = req.params.projectId;

    logger.info({ projectId }, "Delete project request received");

    const foundProject = await db.project.findUnique({
      where: { id: projectId },
      include: { coverImg: true },
    });

    if (!foundProject)
      throw new HttpError({
        statusMessage: "BAD_REQUEST",
        message: "No Project Found to Delete",
      });
    if (!isAdmin && foundProject.authorId !== userId)
      throw new HttpError({
        statusMessage: "FORBIDDEN",
        message: "Unable to Delete Another's Project",
      });

    // Delete old cover image if it exists
    if (foundProject.coverImg) {
      await fileUtils.deleteFile(foundProject.coverImg.key);
      await db.file.delete({ where: { id: foundProject.coverImg.id } });
    }

    // Delete the project from the database
    await db.project.delete({ where: { id: projectId } });

    res.status(200).json(formatApiRespone(null, 200, "Project Deleted"));
  });

// **Get project by slug**
const getProjectBySlugHandler = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;

  logger.info({ slug }, "Fetching project by slug");

  const foundProject = await db.project.findUnique({
    where: { slug, isPublished: true },
    select: baseProjectSelect,
  });

  if (!foundProject) {
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "Project Not Found!",
    });
  }

  res
    .status(200)
    .json(formatApiRespone(foundProject, 200, "Project Retrieved"));
});

// **Get many projects (public & admin)**
const getManyProjectsHandler = (isAdmin: boolean) =>
  asyncHandler(async (req, res, next) => {
    const { pageIndex, pageSize, searchTerm } = req.query as QueryProjectsModel;
    const take = Math.min(Math.max(parseInt(pageSize || "10"), 10), 50);
    const skip = Math.max(parseInt(pageIndex || "0") * take, 0);

    logger.info({ searchTerm, pageIndex, pageSize }, "Fetching projects");

    const where = searchTerm
      ? {
          OR: [
            { description: { contains: searchTerm } },
            { title: { contains: searchTerm } },
          ],
          isPublished: !isAdmin,
        }
      : { isPublished: !isAdmin };

    const [foundProjects, totalProjects] = await Promise.all([
      db.project.findMany({ where, take, skip, select: baseProjectSelect }),
      db.project.count({ where }),
    ]);

    res
      .status(200)
      .json(
        formatApiRespone(
          { foundProjects, totalProjects },
          200,
          "Projects Retrieved"
        )
      );
  });

export default {
  createNewProjectHandler,
  editProjectHandler,
  deleteProjectByIdHandler,
  getProjectBySlugHandler,
  getManyProjectsHandler,
};
