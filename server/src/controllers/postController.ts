import { Post } from "@prisma/client";
import { db } from "../db";
import HttpError from "../error";
import {
  CreateNewPostModel,
  QueryPostsModel,
  UpdatePostModel,
} from "../models/postModels";
import { apiUtils, asyncHandler } from "../utils";
import slugify from "slugify";
import fileUtils from "../utils/fileUtils";
import logger from "../logger"; // Import logging module

const { formatApiRespone } = apiUtils;

const basePostSelect = {
  id: true,
  title: true,
  excerpt: true,
  content: true,
  slug: true,
  coverImage: { select: { id: true, url: true } },
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      avatarFile: { select: { id: true, url: true } },
    },
  },
  isFeatured: true,
  isPublished: true,
  publishDate: true,
  PostTag: { select: { tag: true } },
};

const createNewPostHandler = asyncHandler(async (req, res, next) => {
  const { title, content, isPublished, coverImageId, excerpt, tags } =
    req.body as CreateNewPostModel;
  const authorId = req.user!.id;

  logger.info({ authorId, title }, "Creating new post");

  // Find existing tags or create new ones
  const foundTags = await db.tag.findMany({ where: { name: { in: tags } } });
  const newTags = await Promise.all(
    tags
      .filter((t) => !foundTags.some((tag) => tag.name === t))
      .map((t) => db.tag.create({ data: { name: t } }))
  );
  const allTags = [...foundTags, ...newTags];

  const newPost = await db.post.create({
    data: {
      authorId,
      content,
      isPublished,
      title,
      coverImageId,
      excerpt,
      slug: slugify(title).slice(0, 100),
      isFeatured: false,
      PostTag: {
        createMany: { data: allTags.map((tag) => ({ tagId: tag.id })) },
      },
    },
    select: { ...basePostSelect, dateCreated: true, dateUpdated: true },
  });

  res.status(201).json(formatApiRespone(newPost, 201, "New Post Created!"));
});

const editPostHandler = (isAdmin: boolean) =>
  asyncHandler(async (req, res, next) => {
    const userId = req.user!.id;
    const postId = req.params.postId;
    const {
      title,
      content,
      isPublished,
      coverImageId,
      excerpt,
      tags,
      isFeatured,
    } = req.body as UpdatePostModel;

    logger.info({ postId, userId }, "Editing post request received");

    const foundPost = await db.post.findUnique({
      where: { id: postId },
      include: { PostTag: true, coverImage: true },
    });

    if (!foundPost)
      throw new HttpError({
        statusMessage: "BAD_REQUEST",
        message: "Post does not exist.",
      });
    if (!isAdmin && foundPost.authorId !== userId)
      throw new HttpError({
        statusMessage: "FORBIDDEN",
        message: "You do not have permission to update this post.",
      });

    if (coverImageId !== foundPost.coverImageId) {
      // Delete old cover image if it exists
      if (foundPost.coverImage) {
        await fileUtils.deleteFile(foundPost.coverImage.key);
        await db.file.delete({ where: { id: foundPost.coverImage.id } });
      }
    }

    const updatePayload: Partial<Post> = {
      title,
      content,
      isPublished,
      coverImageId,
      excerpt,
    };
    if (isAdmin) updatePayload.isFeatured = isFeatured;

    if (tags) {
      const foundTags = await db.tag.findMany({
        where: { name: { in: tags } },
      });
      const newTags = await Promise.all(
        tags
          .filter((t) => !foundTags.some((tag) => tag.name === t))
          .map((t) => db.tag.create({ data: { name: t } }))
      );
      const allTags = [...foundTags, ...newTags];

      await db.postTag.deleteMany({ where: { postId } });
      await db.postTag.createMany({
        data: allTags.map((tag) => ({ postId, tagId: tag.id })),
      });
    }

    const updatedPost = await db.post.update({
      where: { id: postId },
      data: updatePayload,
      select: basePostSelect,
    });
    res
      .status(200)
      .json(formatApiRespone(updatedPost, 200, "Post Updated Successfully!"));
  });

const deletePostByIdHandler = (isAdmin: boolean) =>
  asyncHandler(async (req, res, next) => {
    const userId = req.user!.id;
    const postId = req.params.postId;

    logger.info({ postId }, "Delete post request received");

    const foundPost = await db.post.findUnique({
      where: { id: postId },
      include: { coverImage: true },
    });
    if (!foundPost)
      throw new HttpError({
        statusMessage: "BAD_REQUEST",
        message: "No Post Found to Delete",
      });
    if (!isAdmin && foundPost.authorId !== userId)
      throw new HttpError({
        statusMessage: "FORBIDDEN",
        message: "Unable to Delete Another's Post",
      });
    // Delete old cover image if it exists
    if (foundPost.coverImage) {
      await fileUtils.deleteFile(foundPost.coverImage.key);
      await db.file.delete({ where: { id: foundPost.coverImage.id } });
    }
    // Delete the post from the database
    await db.post.delete({ where: { id: postId } });
    res.status(200).json(formatApiRespone(null, 200, "Post Deleted"));
  });

const getPostBySlugHandler = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, slug },
    "Fetching post by slug"
  );

  const foundPost = await db.post.findUnique({
    where: { slug, isPublished: true },
    select: { ...basePostSelect },
  });

  if (!foundPost) {
    logger.warn({ slug }, "Post not found");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "Post Not Found!",
    });
  }

  logger.info({ slug, postId: foundPost.id }, "Post retrieved successfully");

  res.status(200).json(formatApiRespone(foundPost, 200, "Post Retrieved"));
});

const getPostByIdHandler = (isAdmin: boolean) =>
  asyncHandler(async (req, res, next) => {
    const id = req.params.postId;
    const userId = req.user!.id;

    logger.info(
      { method: req.method, url: req.url, ip: req.ip, id },
      "Fetching post by ID"
    );
    const where = { id };

    const foundPost = await db.post.findUnique({
      where,
      select: { ...basePostSelect },
    });

    if (!foundPost) {
      logger.warn({ id }, "Post not found");
      throw new HttpError({
        statusMessage: "NOT_FOUND",
        message: "Post Not Found!",
      });
    }
    if (!isAdmin && foundPost.author.id !== userId) {
      throw new HttpError({
        statusMessage: "FORBIDDEN",
        message: "Cannot Retrieve Post By Id Without Admin or Ownership.",
      });
    }
    logger.info({ id, postId: foundPost.id }, "Post retrieved successfully");

    res.status(200).json(formatApiRespone(foundPost, 200, "Post Retrieved"));
  });

const getManyPostsHandler = (isAdmin: boolean) =>
  asyncHandler(async (req, res, next) => {
    const { pageIndex, pageSize, searchTerm } = req.query as QueryPostsModel;
    const take = Math.min(Math.max(parseInt(pageSize || "10"), 10), 50);
    const skip = Math.max(parseInt(pageIndex || "0") * take, 0);
    const isOwnPost = req.path.includes("me");
    logger.info(
      {
        method: req.method,
        url: req.url,
        ip: req.ip,
        searchTerm,
        pageIndex,
        pageSize,
      },
      "Fetching posts"
    );

    const whereWithoutAuthor = searchTerm
      ? {
          AND: {
            OR: [
              { excerpt: { contains: searchTerm } },
              { title: { contains: searchTerm } },
            ],
            isPublished: true,
          },
        }
      : { isPublished: true };
    const whereWithAuthor =
      searchTerm && req.path.includes("me")
        ? {
            AND: {
              OR: [
                { excerpt: { contains: searchTerm } },
                { title: { contains: searchTerm } },
              ],
              isPublished: true,
              authorId: req.user!.id,
            },
          }
        : { isPublished: true, authorId: req.user!.id };

    const select: typeof basePostSelect & {
      dateCreated?: boolean;
      dateUpdated?: boolean;
    } = {
      ...basePostSelect,
    };

    if (isAdmin || isOwnPost) {
      select.dateCreated = true;
      select.dateUpdated = true;
    }

    const [foundPosts, totalPosts] = await Promise.all([
      db.post.findMany({
        where: req.path.includes("me") ? whereWithAuthor : whereWithoutAuthor,
        take,
        skip,
        select: {
          ...basePostSelect,
          dateCreated: true,
          dateUpdated: true,
        },
      }),
      db.post.count({
        where: req.path.includes("me") ? whereWithAuthor : whereWithoutAuthor,
      }),
    ]);

    logger.info(
      { totalPosts, currentPage: skip / take + 1 },
      "Posts retrieved successfully"
    );

    res
      .status(200)
      .json(
        formatApiRespone({ foundPosts, totalPosts }, 200, "Posts Retrieved")
      );
  });

export default {
  createNewPostHandler,
  editPostHandler,
  deletePostByIdHandler,
  getPostBySlugHandler,
  getManyPostsHandler,
  getPostByIdHandler,
};
