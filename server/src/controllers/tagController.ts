import { db } from "../db";
import HttpError from "../error";
import { apiUtils, asyncHandler } from "../utils";
import logger from "../logger";

const { formatApiRespone } = apiUtils;

// Create a new tag
const createTagHandler = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  logger.info(
    { method: req.method, url: req.url, ip: req.ip, name },
    "Creating new tag"
  );

  if (!name) {
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "Tag name is required.",
    });
  }

  // Check if tag exists
  const existingTag = await db.tag.findUnique({ where: { name } });
  if (existingTag) {
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "Tag already exists.",
    });
  }

  // Create the tag
  const newTag = await db.tag.create({ data: { name } });

  logger.info({ tagId: newTag.id, name }, "Tag created successfully");
  res
    .status(201)
    .json(formatApiRespone(newTag, 201, "Tag Created Successfully"));
});

// Get all tags
const getAllTagsHandler = asyncHandler(async (req, res, next) => {
  logger.info(
    { method: req.method, url: req.url, ip: req.ip },
    "Fetching all tags"
  );

  const tags = await db.tag.findMany();
  res
    .status(200)
    .json(formatApiRespone(tags, 200, "Tags Retrieved Successfully"));
});

// Get a tag by ID
const getTagByIdHandler = asyncHandler(async (req, res, next) => {
  const tagId = req.params.tagId;

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, tagId },
    "Fetching tag by ID"
  );

  const tag = await db.tag.findUnique({ where: { id: tagId } });

  if (!tag) {
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "Tag Not Found.",
    });
  }

  res
    .status(200)
    .json(formatApiRespone(tag, 200, "Tag Retrieved Successfully"));
});

// Delete a tag (Admin Only)
const deleteTagHandler = asyncHandler(async (req, res, next) => {
  const tagId = req.params.tagId;

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, tagId },
    "Deleting tag request received"
  );

  const tag = await db.tag.findUnique({ where: { id: tagId } });

  if (!tag) {
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "No Tag Found to Delete.",
    });
  }

  // Delete the tag
  await db.tag.delete({ where: { id: tagId } });

  logger.info({ tagId }, "Tag deleted successfully");
  res.status(200).json(formatApiRespone(null, 200, "Tag Deleted Successfully"));
});

export default {
  createTagHandler,
  getAllTagsHandler,
  getTagByIdHandler,
  deleteTagHandler,
};
