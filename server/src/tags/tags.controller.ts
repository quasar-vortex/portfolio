import { RequestHandler } from "express";
import { CreateTagModel, SearchTagsModel } from "./tags.models";
import logger from "../logger";
import { db } from "../db";
import { HttpError } from "../error";

const createNewTagHandler: RequestHandler = async (req, res, next) => {
  //@ts-ignore: Global issue with user
  const signedInId = req.user!.id;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId: signedInId,
  };
  try {
    logger.info({ ...meta }, "Creating new tag.");

    const { name } = req.body as CreateTagModel;

    // check if tag exists
    const existingTag = await db.tag.findUnique({ where: { name } });
    if (existingTag) {
      logger.warn({ ...meta }, "Tag Exists");
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "Tag name in use.",
      });
    }

    const newTag = await db.tag.create({
      data: { name, authorId: signedInId },
    });

    logger.info({ ...meta }, "New Tag Created");

    res.status(201).json({
      data: { ...newTag },
      message: "Tag Created Successfully",
    });
  } catch (error) {
    logger.warn({ error }, "Tag creation failed");
    return next(error);
  }
};
const searchTagsHandler: RequestHandler = async (req, res, next) => {
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
  };
  try {
    const role = req.user?.role;
    const {
      name,
      pageIndex = "0",
      pageSize = "10",
    } = req.query as SearchTagsModel;

    const trimmedTerm = name?.trim();
    // Ensure index is at least 0
    const index = parseInt(pageIndex);
    const parsedIndex = isNaN(index) ? 0 : Math.max(index, 0);
    // Ensure size is at least 10
    const size = parseInt(pageSize);
    const parsedPageSize = isNaN(size) ? 10 : Math.min(10, Math.max(size, 0));

    logger.info(
      {
        ...meta,
        term: trimmedTerm,
        pageIndex: parsedIndex,
        pageSize: parsedPageSize,
      },
      "Searching for tags."
    );
    // if not admin only able to see active tags
    const where: { name?: { contains: string }; isActive?: boolean } = {};
    // if term add to search
    if (trimmedTerm) where.name = { contains: trimmedTerm };
    if (role !== "ADMIN") where.isActive = true;
    // if admin able to see author and isactive
    const select: Record<string, boolean> = {
      id: true,
      name: true,
      authorId: role === "ADMIN" || false,
      isActive: role === "ADMIN" || false,
    };
    const foundTags = await db.tag.findMany({
      where,
      take: parsedPageSize,
      skip: parsedIndex * parsedPageSize,
      select,
    });
    logger.info(
      {
        ...meta,
        term: trimmedTerm,
        pageIndex: parsedIndex,
        pageSize: parsedPageSize,
      },
      "Tags Successfully Found"
    );
    res
      .status(200)
      .json({ message: "Tags found succesfully!", data: foundTags });
  } catch (error) {
    logger.warn({ error }, "Unable to retrieve tags.");
    return next(error);
  }
};
const updateTagByIdHandler: RequestHandler = async (req, res, next) => {
  const tagId = req.params.tagId;
  //@ts-ignore: global user type issue
  const signedInId = req.user!.id;
  //@ts-ignore: global user type issue
  const role = req.user!.role;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    tagId: tagId,
    userId: signedInId,
  };
  const isAdmin = role === "ADMIN";

  logger.info(meta, "Updating tag.");
  try {
    const where: { id: string; isActive?: boolean } = {
      id: tagId,
    };
    // only show author and isactive to admin
    const select = {
      id: true,
      name: true,
      authorId: isAdmin,
      isActive: isAdmin,
    };
    // if not admin only show active tags
    if (!isAdmin) where.isActive = true;
    const foundTag = await db.tag.findUnique({
      where,
      select,
    });
    if (!foundTag) {
      logger.warn(meta, "Tag was not found");
      throw new HttpError({
        status: "NOT_FOUND",
        message: `Tag with ${tagId} was not found!`,
      });
    }

    logger.info(meta, "Tag found successfully.");
    res
      .status(200)
      .json({ message: "Tag found successfully!", data: foundTag });
  } catch (error) {
    logger.warn({ error }, "Unable to update tag.");
    return next(error);
  }
};

const getTagByIdHandler: RequestHandler = async (req, res, next) => {
  const tagId = req.params.tagId;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    tagId,
  };
  logger.info(meta, "Request to get tag by Id.");
  try {
    const isAdmin = req.user?.role === "ADMIN";
    const where: { id: string; isActive?: boolean } = {
      id: tagId,
    };
    // only show author and isactive to admin
    const select = {
      id: true,
      name: true,
      authorId: isAdmin,
      isActive: isAdmin,
    };
    // if not admin only show active tags
    if (!isAdmin) where.isActive = true;
    const foundTag = await db.tag.findUnique({
      where,
      select,
    });
    if (!foundTag) {
      logger.warn(meta, "Tag was not found");
      throw new HttpError({
        status: "NOT_FOUND",
        message: `Tag with ${tagId} was not found!`,
      });
    }
    logger.info("Tag was found!");
    res.status(200).json({ data: foundTag });
  } catch (error) {
    logger.warn({ error }, "Unable to get tag.");
    return next(error);
  }
};

const getTagByNameHandler: RequestHandler = async (req, res, next) => {
  const tagName = req.params.tagName;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    tagName,
  };
  logger.info(meta, "Request to get tag by name.");
  try {
    const isAdmin = req.user?.role === "ADMIN";
    const where: { name: string; isActive?: boolean } = {
      name: tagName,
    };
    // only show author and isactive to admin
    const select = {
      id: true,
      name: true,
      authorId: isAdmin,
      isActive: isAdmin,
    };
    // if not admin only show active tags
    if (!isAdmin) where.isActive = true;
    const foundTag = await db.tag.findUnique({
      where,
      select,
    });
    if (!foundTag) {
      logger.warn(meta, "Tag was not found");
      throw new HttpError({
        status: "NOT_FOUND",
        message: `Tag with ${tagName} was not found!`,
      });
    }
    logger.info("Tag was found!");
    res.status(200).json({ data: foundTag });
  } catch (error) {
    logger.warn({ error }, "Unable to get tag.");
    return next(error);
  }
};
const deleteTagByIdHandler: RequestHandler = async (req, res, next) => {
  const tagId = req.params.tagId;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    tagId,
    //@ts-ignore: global user
    userId: req.user!.id,
  };
  logger.info(meta, "Request to get tag by Id.");
  try {
    //@ts-ignore: global user
    const isAdmin = req.user!.role === "ADMIN";
    if (!isAdmin)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be admin to delete tag.",
      });

    const foundTag = await db.tag.findUnique({ where: { id: tagId } });

    if (!foundTag) {
      logger.warn(meta, "Tag was not found");
      throw new HttpError({
        status: "NOT_FOUND",
        message: `Tag with ${tagId} was not found!`,
      });
    }
    logger.info("Tag was deleted!");
    await db.tag.delete({ where: { id: tagId } });
    res.status(200).json({ data: foundTag });
  } catch (error) {
    logger.warn({ error }, "Unable to delete tag.");
    return next(error);
  }
};

export {
  createNewTagHandler,
  searchTagsHandler,
  updateTagByIdHandler,
  getTagByIdHandler,
  getTagByNameHandler,
  deleteTagByIdHandler,
};
