import slugify from "slugify";
import { HttpError } from "../error";
import logger from "../logger";
import { AuthenticatedRequestHandler } from "../types";
import { db } from "../db";
import { deleteFileByKey, S3UploadedFile } from "../upload";
import { CreatePostModel } from "./post.models";

const MAX_FEATURED_POSTS = 3;

export const createPostHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const role = req.user!.role;
  const authorId = req.user!.id;
  const coverImage = req.file as unknown as
    | (S3UploadedFile & Express.Multer.File)
    | undefined;

  const { title, excerpt, content, tags, isPublished } =
    req.body as CreatePostModel;

  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId: authorId,
  };

  try {
    logger.info(meta, "Creating Post");
    if (role !== "ADMIN")
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be an admin to create a post!",
      });

    const slug = slugify(title.trim()).slice(0, 100);

    const dbPost = await db.$transaction(async (tx) => {
      let coverImageId: null | string = null;
      if (coverImage) {
        const dbFile = await tx.file.create({
          data: {
            userId: authorId,
            objectKey: coverImage.key,
            originalName: coverImage.originalname,
            size: coverImage.size,
            url: coverImage.location,
          },
        });
        coverImageId = dbFile.id;
      }
      const foundTags = await tx.tag.count({
        where: { id: { in: tags } },
      });
      if (foundTags !== tags.length)
        throw new HttpError({
          status: "BAD_REQUEST",
          message: "Invalid tag ID passed.",
        });
      const dbPost = await tx.post.create({
        data: {
          slug,
          title,
          excerpt,
          content,
          isPublished,
          authorId,
          isActive: true,
          isFeatured: false,
          updatedById: authorId,
          coverImageId,
          PostTag: { createMany: { data: tags.map((t) => ({ tagId: t })) } },
        },
      });

      return dbPost;
    });

    logger.info({ ...meta, postId: dbPost.id }, "Post created!");
    res.status(201).json({ message: "Post created!", data: dbPost });
  } catch (error) {
    if (coverImage) await deleteFileByKey(coverImage.key);
    logger.warn({ error }, "Unable to create post and upload file.");

    next(error);
  }
};

export const updatePostHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {};

export const getPostByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {};

export const getPostBySlugHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {};

export const getManyPostsHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {};

// Set post to inactive flag
export const deletePostHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {};

// Remove oldest featured post and add new one if count exceeds 3
export const setPostFeatured: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {};
