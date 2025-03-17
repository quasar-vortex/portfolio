import { db } from "../db";
import HttpError from "../error";
import logger from "../logger";
import { QueryTagModel } from "../models/tagModels";
import { apiUtils, asyncHandler } from "../utils";

export const createNewTagHandler = asyncHandler(async (req, res, next) => {
  const name = req.body.name;
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user!.id,
  };
  logger.info(logMeta, "Request to create tag received.");
  const foundTag = await db.tag.findUnique({ where: { name } });

  if (foundTag) {
    logger.error({ ...logMeta, name }, "Tag exists already.");
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "Tag Exists.",
    });
  }

  const newTag = await db.tag.create({ data: { name } });
  logger.info({ ...logMeta, name }, "Tag created successfully..");
  res.status(201).json(
    apiUtils.formatApiResponse({
      data: newTag,
      message: "Tag Created Successfully",
    })
  );
});
export const updateTagByIdHandler = asyncHandler(async (req, res, next) => {
  const tagId = req.params.tagId;
  const name = req.body.name;
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user!.id,
  };
  const foundTag = await db.tag.findUnique({ where: { id: tagId } });

  if (!foundTag) {
    logger.error({ ...logMeta, tagId }, "Tag Not Found.");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "Tag Does Not Exist.",
    });
  }
  const updatedTag = await db.tag.update({
    where: { id: tagId },
    data: { name },
  });

  logger.info({ ...logMeta, tagId }, "Tag created successfully..");
  res.status(200).json(
    apiUtils.formatApiResponse({
      data: updatedTag,
      message: "Tag Updated Successfully",
    })
  );
});
export const deleteTagByIdHandler = asyncHandler(async (req, res, next) => {
  const tagId = req.params.tagId;
  const name = req.body.name;
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user!.id,
  };
  const foundTag = await db.tag.findUnique({ where: { id: tagId } });

  if (!foundTag) {
    logger.error({ ...logMeta, tagId }, "Tag Not Found.");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "Tag Does Not Exist.",
    });
  }
  await db.tag.delete({
    where: { id: tagId },
  });

  logger.info({ ...logMeta, tagId }, "Tag deleted successfully.");
  res.status(200).json(
    apiUtils.formatApiResponse({
      message: "Tag Deleted Successfully",
    })
  );
});
export const getManyTagsHandler = asyncHandler(async (req, res, next) => {
  const { pageIndex, pageSize, searchTerm } = req.query as QueryTagModel;

  logger.info(
    { userId: req.user!.id, searchTerm, pageIndex, pageSize },
    "Fetching tags..."
  );

  // Trim search term if provided
  const trimmedSearchTerm = searchTerm?.trim();

  // Define search filter (no need for `mode: "insensitive"` in MySQL)
  const where = trimmedSearchTerm
    ? {
        name: { contains: trimmedSearchTerm },
      }
    : {};

  // Pagination Handling (Ensure valid values)
  const parsedPageIndex = Math.max(1, Number(pageIndex) || 1) - 1;
  const parsedPageSize = Math.max(1, Number(pageSize) || 10);
  const skip = parsedPageIndex * parsedPageSize;

  // Get total count
  const totalRecords = await db.tag.count({ where });

  // Fetch paginated tags
  const foundTags = await db.tag.findMany({
    where,
    skip,
    take: parsedPageSize,
  });

  // Calculate total pages (ensure at least 1)
  const totalPages = Math.max(1, Math.ceil(totalRecords / parsedPageSize));

  logger.info(
    { userId: req.user!.id, totalRecords },
    "Tags retrieved successfully."
  );

  // Return response
  res.status(200).json(
    apiUtils.formatApiResponse({
      data: foundTags,
      currentPage: parsedPageIndex + 1,
      totalPages,
      totalRecords,
      message: "Tags retrieved successfully",
    })
  );
});
export const getTagByIdHandler = asyncHandler(async (req, res, next) => {
  const tagId = req.params.tagId;

  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user!.id,
  };
  const foundTag = await db.tag.findUnique({ where: { id: tagId } });

  if (!foundTag) {
    logger.error({ ...logMeta, tagId }, "Tag Not Found.");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "Tag Does Not Exist.",
    });
  }
  logger.info({ ...logMeta, tagId }, "Found tag successfully.");
  res.status(200).json(
    apiUtils.formatApiResponse({
      data: foundTag,
      message: "Tag Found Successfully",
    })
  );
});

export default {
  createNewTagHandler,
  updateTagByIdHandler,
  deleteTagByIdHandler,
  getManyTagsHandler,
  getTagByIdHandler,
};
