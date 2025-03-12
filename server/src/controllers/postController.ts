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

const createNewPostHandler = asyncHandler(async (req, res, next) => {
  const { authorId, content, isPublished, title, coverImageId, excerpt, tags } =
    req.body as CreateNewPostModel;

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, authorId, title },
    "Creating new post"
  );
  // Find Existing Tags
  const foundTags = await Promise.all(
    tags.map(async (t) => await db.tag.findUnique({ where: { name: t } }))
  );
  // Filter Out Tags Not Found and Create Them
  const newTags = await Promise.all(
    tags
      .filter((t) => !foundTags.find((i) => i?.name === t))
      .map((t) =>
        db.tag.create({
          data: { name: t },
        })
      )
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
      PostTag: {
        createMany: { data: allTags.map((tag) => ({ tagId: tag!.id })) },
      },
    },
    select: {
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
      dateCreated: true,
      dateUpdated: true,
      isPublished: true,
      publishDate: true,
      PostTag: { select: { tag: true } },
    },
  });

  logger.info({ postId: newPost.id, title }, "Post created successfully");

  res.status(201).json(formatApiRespone(newPost, 201, "New Post Created!"));
});
const editPostHandler = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;
  const { content, title, isPublished, coverImageId, excerpt, tags } =
    req.body as UpdatePostModel;

  logger.info(
    {
      method: req.method,
      url: req.url,
      ip: req.ip,
      postId,
      userId: req.user!.id,
    },
    "Editing post request received"
  );

  const foundPost = await db.post.findUnique({
    where: { id: postId },
    include: { coverImage: true, PostTag: true },
  });

  if (!foundPost) {
    logger.warn({ postId }, "Post not found");
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "Post does not exist.",
    });
  }

  if (foundPost.authorId !== req.user!.id) {
    logger.warn(
      { postId, userId: req.user!.id },
      "Unauthorized post update attempt"
    );
    throw new HttpError({
      statusMessage: "FORBIDDEN",
      message: "You do not have permission to update this post.",
    });
  }

  const updatePayload: Partial<Post> = {};
  if (content) updatePayload.content = content;
  if (title) updatePayload.title = title;
  if (isPublished !== undefined) {
    updatePayload.isPublished = isPublished;
    if (isPublished && !foundPost.publishDate) {
      updatePayload.publishDate = new Date();
    }
  }
  if (coverImageId) updatePayload.coverImageId = coverImageId;
  if (excerpt) updatePayload.excerpt = excerpt;

  if (tags) {
    logger.info({ postId, tags }, "Updating post tags");

    // Find existing tags
    const foundTags = await db.tag.findMany({
      where: {
        name: { in: tags },
      },
    });

    // Determine missing tags and create them
    const existingTagNames = foundTags.map((t) => t.name);
    const newTagNames = tags.filter((t) => !existingTagNames.includes(t));

    const newTags = await Promise.all(
      newTagNames.map((t) =>
        db.tag.create({
          data: { name: t },
        })
      )
    );

    // Get all updated tags
    const allTags = [...foundTags, ...newTags];

    // Delete old PostTag relations
    await db.postTag.deleteMany({
      where: { postId },
    });

    // Create new PostTag relations
    await db.postTag.createMany({
      data: allTags.map((tag) => ({ postId, tagId: tag.id })),
    });

    logger.info(
      { postId, tags: allTags.map((t) => t.name) },
      "Post tags updated"
    );
  }

  const updatedPost = await db.post.update({
    where: { id: postId },
    data: updatePayload,
    select: {
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
      dateCreated: true,
      dateUpdated: true,
      isPublished: true,
      publishDate: true,
      PostTag: { select: { tag: true } },
    },
  });

  logger.info({ postId }, "Post updated successfully");

  res
    .status(200)
    .json(formatApiRespone(updatedPost, 200, "Post Updated Successfully!"));
});

const deletePostByIdHandler = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, postId },
    "Delete post request received"
  );

  const foundPost = await db.post.findUnique({
    where: { id: postId },
    include: { coverImage: true },
  });

  if (!foundPost) {
    logger.warn({ postId }, "Post not found for deletion");
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "No Post Found to Delete",
    });
  }

  if (foundPost.coverImageId) {
    logger.info(
      { postId, coverImageId: foundPost.coverImageId },
      "Deleting associated cover image"
    );
    await fileUtils.deleteFile(foundPost.coverImage!.key);
    await db.file.delete({ where: { id: foundPost.coverImageId } });
  }

  await db.post.delete({ where: { id: postId } });

  logger.info({ postId }, "Post deleted successfully");

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
    select: {
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
      isPublished: true,
      publishDate: true,
      PostTag: { select: { tag: true } },
    },
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

const getManyPostsHandler = asyncHandler(async (req, res, next) => {
  const { pageIndex, pageSize, searchTerm } = req.query as QueryPostsModel;
  const take = Math.min(Math.max(parseInt(pageSize || "10"), 10), 50);
  const skip = Math.max(parseInt(pageIndex || "0") * take, 0);

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

  const where = searchTerm
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

  const [foundPosts, totalPosts] = await Promise.all([
    db.post.findMany({
      where,
      take,
      skip,
      select: {
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
        isPublished: true,
        publishDate: true,
        PostTag: { select: { tag: true } },
      },
    }),
    db.post.count({ where }),
  ]);

  logger.info(
    { totalPosts, currentPage: skip / take + 1 },
    "Posts retrieved successfully"
  );

  res
    .status(200)
    .json(formatApiRespone({ foundPosts, totalPosts }, 200, "Posts Retrieved"));
});

const getSignedInPostsHandler = asyncHandler(async (req, res, next) => {
  const { pageIndex, pageSize, searchTerm } = req.query as QueryPostsModel;
  const take = Math.min(Math.max(parseInt(pageSize || "10"), 10), 50);
  const skip = Math.max(parseInt(pageIndex || "0") * take, 0);
  const userId = req.user!.id;

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId, searchTerm },
    "Fetching signed-in user's posts"
  );

  const where = searchTerm
    ? {
        AND: {
          OR: [
            { excerpt: { contains: searchTerm } },
            { title: { contains: searchTerm } },
          ],
          authorId: userId,
        },
      }
    : { authorId: userId };

  const [foundPosts, totalPosts] = await Promise.all([
    db.post.findMany({
      where,
      take,
      skip,
      select: {
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
        dateCreated: true,
        dateUpdated: true,
        isPublished: true,
        publishDate: true,
        PostTag: { select: { tag: true } },
      },
    }),
    db.post.count({ where }),
  ]);

  logger.info(
    { totalPosts, currentPage: skip / take + 1 },
    "User posts retrieved successfully"
  );

  res
    .status(200)
    .json(
      formatApiRespone({ foundPosts, totalPosts }, 200, "User Posts Retrieved")
    );
});

const getAdminPostsHandler = asyncHandler(async (req, res, next) => {
  const { pageIndex, pageSize, searchTerm } = req.query as QueryPostsModel;
  const take = Math.min(Math.max(parseInt(pageSize || "10"), 10), 50);
  const skip = Math.max(parseInt(pageIndex || "0") * take, 0);
  const adminId = req.user!.id;

  logger.info(
    {
      method: req.method,
      url: req.url,
      ip: req.ip,
      adminId,
      searchTerm,
      pageIndex,
      pageSize,
    },
    "Admin fetching all posts"
  );

  const where = searchTerm
    ? {
        OR: [
          { title: { contains: searchTerm } },
          { excerpt: { contains: searchTerm } },
        ],
      }
    : {};

  const [foundPosts, totalPosts] = await Promise.all([
    db.post.findMany({
      where,
      take,
      skip,
      select: {
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
        dateCreated: true,
        dateUpdated: true,
        isPublished: true,
        publishDate: true,
        PostTag: { select: { tag: true } },
      },
    }),
    db.post.count({ where }),
  ]);

  const totalPages = Math.ceil(totalPosts / take);
  const currentPage = skip / take + 1;

  logger.info(
    { totalPosts, currentPage, totalPages },
    "Admin retrieved posts successfully"
  );

  res
    .status(200)
    .json(
      formatApiRespone(
        { foundPosts, totalPosts, totalPages, currentPage },
        200,
        "Admin Posts Retrieved."
      )
    );
});

export default {
  createNewPostHandler,
  editPostHandler,
  deletePostByIdHandler,
  getPostBySlugHandler,
  getManyPostsHandler,
  getSignedInPostsHandler,
  getAdminPostsHandler,
};
