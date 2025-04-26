import slugify from "slugify";
import { HttpError } from "../error";
import logger from "../logger";
import { AuthenticatedRequestHandler } from "../types";
import { db } from "../db";
import { deleteFileByKey, S3UploadedFile } from "../upload";
import { CreatePostModel, UpdatePostModel } from "./post.models";

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

  const {
    title,
    excerpt,
    content,
    tags,
    isPublished,
    isFeatured = false,
  } = req.body as CreatePostModel;

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

    if (!isPublished && isFeatured) {
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "Only published posts can be featured!",
      });
    }
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
          isFeatured,
          updatedById: authorId,
          coverImageId,
          PostTag: { createMany: { data: tags.map((t) => ({ tagId: t })) } },
          publishDate: (isPublished && new Date().toDateString()) || null,
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
) => {
  const postId = req.params.postId;
  const role = req.user!.role;
  const authorId = req.user!.id;
  const coverImage = req.file as unknown as
    | (S3UploadedFile & Express.Multer.File)
    | undefined;

  const { title, excerpt, content, tags, isPublished, isFeatured } =
    req.body as UpdatePostModel;

  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId: authorId,
    postId,
  };

  try {
    if (role !== "ADMIN") {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be an admin to update a post.",
      });
    }
    logger.info(meta, "Updating post");
    const foundPost = await db.post.findUnique({
      where: { id: postId },
      include: { coverImage: true },
    });

    if (!isPublished && isFeatured) {
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "Only published posts can be featured!",
      });
    }
    const slug = slugify(title.trim()).slice(0, 100);

    if (!foundPost)
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Post was not found!",
      });
    const dbPost = await db.$transaction(async (tx) => {
      let coverImageId: null | string = null;
      // Create new image
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
      // Remove old image
      if (foundPost.coverImageId) {
        await tx.file.delete({ where: { id: foundPost.coverImageId } });
      }
      // Verify tags exist
      const foundTags = await tx.tag.count({
        where: { id: { in: tags } },
      });
      if (foundTags !== tags.length)
        throw new HttpError({
          status: "BAD_REQUEST",
          message: "Invalid tag ID passed.",
        });
      // Delete old post tags
      await tx.postTag.deleteMany();
      // Update post
      const dbPost = await tx.post.update({
        where: { id: foundPost.id },
        data: {
          title,
          excerpt,
          content,
          PostTag: {
            createMany: {
              data: tags.map((t) => ({ tagId: t })),
            },
          },
          isFeatured,
          isPublished,
          coverImageId,
          publishDate:
            !foundPost.isPublished && isPublished
              ? new Date().toDateString()
              : foundPost.publishDate,
          updatedById: authorId,
          slug,
        },
      });
      return dbPost;
    });
    // clean up old s3 file
    if (foundPost.coverImage)
      await deleteFileByKey(foundPost.coverImage.objectKey);

    logger.info({ ...meta, postId: dbPost.id }, "Post updated!");
    res.status(201).json({ message: "Post updated!", data: dbPost });
  } catch (error) {
    if (coverImage) await deleteFileByKey(coverImage.key);
    logger.warn({ error }, "Unable to create post and upload file.");

    next(error);
  }
};

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
