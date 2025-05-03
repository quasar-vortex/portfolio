import { CreateTagModel, SearchTagsModel, UpdateTagModel } from "./tags.models";
import logger from "../logger";
import { db } from "../db";
import { HttpError } from "../error";
import { AuthenticatedRequestHandler } from "../types";

const baseSelect = {
  id: true,

  name: true,
};
const adminSelect = { ...baseSelect, isActive: true, authorId: true };
const createNewTagHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const signedInId = req.user!.id;
  const role = req.user!.role;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId: signedInId,
  };
  try {
    logger.info({ ...meta }, "Creating new tag.");

    if (role !== "ADMIN") {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be an admin to make a tag.",
      });
    }

    const { name } = req.body as CreateTagModel;

    const existingTag = await db.tag.findUnique({ where: { name } });
    if (existingTag) {
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "Tag name in use.",
      });
    }

    const newTag = await db.tag.create({
      data: { name, authorId: signedInId },
    });

    logger.info({ ...meta }, "New Tag Created");
    res.status(201).json({ data: newTag, message: "Tag Created Successfully" });
  } catch (error) {
    logger.warn(
      { error: error instanceof Error ? error.message : error },
      "Tag creation failed"
    );
    return next(error);
  }
};

const searchTagsHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
  };
  try {
    const role = req.user?.role;
    const {
      name,
      pageIndex = "1",
      pageSize = "10",
    } = req.query as unknown as SearchTagsModel;

    const trimmedTerm = name?.trim();
    const index = Math.max((parseInt(pageIndex, 10) || 1) - 1, 0);
    const size = Math.min(Math.max(parseInt(pageSize, 10) || 10, 1), 50);

    logger.info(
      { ...meta, term: trimmedTerm, pageIndex: index + 1, pageSize: size },
      "Searching for tags."
    );

    const where: { name?: { contains: string }; isActive?: boolean } = {};
    if (trimmedTerm) where.name = { contains: trimmedTerm };
    if (role !== "ADMIN") where.isActive = true;

    const count = await db.tag.count({ where });
    const foundTags = await db.tag.findMany({
      where,
      take: size,
      skip: index * size,
      select: role === "ADMIN" ? adminSelect : baseSelect,
    });

    logger.info(
      {
        ...meta,
        pageIndex: index + 1,
        pageSize: size,
        totalPages: Math.max(1, Math.ceil(count / size)),
        totalCount: count,
      },
      "Tags Successfully Found"
    );
    res.status(200).json({
      message: "Tags found successfully!",
      data: foundTags,
      meta: {
        pageSize: size,
        pageIndex: index + 1,
        totalPages: Math.max(1, Math.ceil(count / size)),
        totalCount: count,
      },
    });
  } catch (error) {
    logger.warn(
      { ...meta, error: error instanceof Error ? error.message : error },
      "Unable to retrieve tags."
    );
    return next(error);
  }
};

const updateTagByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const tagId = req.params.tagId;
  const signedInId = req.user!.id;
  const role = req.user!.role;
  const isAdmin = role === "ADMIN";
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    tagId,
    userId: signedInId,
  };

  logger.info(meta, "Updating tag.");
  try {
    if (!isAdmin) {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be an admin to update a tag.",
      });
    }
    const { name } = req.body as UpdateTagModel;
    const foundTag = await db.tag.findUnique({ where: { id: tagId } });
    if (!foundTag)
      throw new HttpError({
        status: "NOT_FOUND",
        message: "TAG NOT FOUND!",
      });

    if (name !== foundTag.name) {
      const nameInUse = await db.tag.findUnique({ where: { name } });
      if (nameInUse) {
        throw new HttpError({
          status: "BAD_REQUEST",
          message: `Tag name ${name} is in use.`,
        });
      }
    }
    const updatedTag = await db.tag.update({
      where: { id: tagId },
      data: { name },
      select: {
        id: true,
        isActive: true,
        name: true,
        authorId: true,
      },
    });

    logger.info(meta, "Tag updated successfully.");
    res
      .status(200)
      .json({ message: "Tag updated successfully!", data: updatedTag });
  } catch (error) {
    logger.warn(
      { error: error instanceof Error ? error.message : error },
      "Unable to update tag."
    );
    return next(error);
  }
};

const getTagByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const tagId = req.params.tagId;
  const isAdmin = req.user?.role === "ADMIN";
  const meta = { ip: req.ip, method: req.method, url: req.url, tagId };

  logger.info(meta, "Request to get tag by Id.");
  try {
    const where = isAdmin ? { id: tagId } : { id: tagId, isActive: true };

    const foundTag = await db.tag.findUnique({
      where,
      select: isAdmin ? adminSelect : baseSelect,
    });
    if (!foundTag) {
      logger.warn(meta, "Tag was not found");
      throw new HttpError({
        status: "NOT_FOUND",
        message: `Tag with ${tagId} was not found!`,
      });
    }

    logger.info(meta, "Tag was found!");
    res.status(200).json({ data: foundTag });
  } catch (error) {
    logger.warn(
      { error: error instanceof Error ? error.message : error },
      "Unable to get tag."
    );
    return next(error);
  }
};

const getTagByNameHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const tagName = req.params.tagName;
  const isAdmin = req.user?.role === "ADMIN";
  const meta = { ip: req.ip, method: req.method, url: req.url, tagName };

  logger.info(meta, "Request to get tag by name.");
  try {
    const where = isAdmin
      ? { name: tagName }
      : { name: tagName, isActive: true };

    const foundTag = await db.tag.findUnique({
      where,
      select: {
        id: true,
        isActive: true,
        name: true,
        authorId: true,
      },
    });
    if (!foundTag) {
      logger.warn(meta, "Tag was not found");
      throw new HttpError({
        status: "NOT_FOUND",
        message: `Tag with ${tagName} was not found!`,
      });
    }

    logger.info(meta, "Tag was found!");
    res.status(200).json({ data: foundTag });
  } catch (error) {
    logger.warn(
      { error: error instanceof Error ? error.message : error },
      "Unable to get tag."
    );
    return next(error);
  }
};

const deleteTagByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const tagId = req.params.tagId;
  const isAdmin = req.user!.role === "ADMIN";
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    tagId,
    userId: req.user!.id,
  };

  logger.info(meta, "Request to delete tag by Id.");
  try {
    if (!isAdmin) {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be admin to delete tag.",
      });
    }

    const foundTag = await db.tag.findUnique({ where: { id: tagId } });
    if (!foundTag) {
      logger.warn(meta, "Tag was not found");
      throw new HttpError({
        status: "NOT_FOUND",
        message: `Tag with ${tagId} was not found!`,
      });
    }

    await db.tag.update({ where: { id: tagId }, data: { isActive: false } });
    logger.info(meta, "Tag was deactivated (soft deleted).");
    res.status(200).json({ data: foundTag });
  } catch (error) {
    logger.warn(
      { error: error instanceof Error ? error.message : error },
      "Unable to delete tag."
    );
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
