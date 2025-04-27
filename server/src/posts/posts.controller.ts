import slugify from "slugify";
import { HttpError } from "../error";
import logger from "../logger";
import { AuthenticatedRequestHandler } from "../types";
import { db } from "../db";
import { deleteFileByKey, S3UploadedFile } from "../upload";
import {
  CreatePostModel,
  SearchPostsModel,
  UpdatePostModel,
} from "./post.models";
import { FileType } from "../generated/prisma";

const MAX_FEATURED_POSTS = 3;
export const createPostHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const role = req.user!.role;
  const authorId = req.user!.id;
  const {
    title,
    excerpt,
    content,
    tags,
    isPublished,
    isFeatured = false,
    coverImageId,
  } = req.body as CreatePostModel;

  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId: authorId,
  };
  const isAdmin = role === "ADMIN";

  try {
    logger.info(meta, "Creating Post");

    if (!isAdmin) {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be an admin to author a post.",
      });
    }

    if (coverImageId) {
      const foundImageFile = await db.file.findUnique({
        where: { id: coverImageId },
      });
      if (!foundImageFile) {
        throw new HttpError({
          status: "BAD_REQUEST",
          message: "Cover image does not exist!",
        });
      }
    }

    if (isFeatured && !isPublished) {
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "Only published posts may be featured!",
      });
    }

    const foundTagCount = await db.tag.count({
      where: {
        AND: {
          isActive: true,
          id: { in: tags },
        },
      },
    });

    if (foundTagCount !== tags.length) {
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "Invalid tags.",
      });
    }

    const slug = slugify(title).slice(0, 100);

    const featuredPosts = await db.post.findMany({
      where: { isFeatured: true },
    });
    const newPost = await db.post.create({
      data: {
        title,
        content,
        slug,
        excerpt,
        authorId,
        publishDate: isPublished ? new Date().toISOString() : null,
        ...(coverImageId && { coverImageId }),
        PostTag: { createMany: { data: tags.map((t) => ({ tagId: t })) } },
      },
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        coverImageId: true,
        authorId: true,
        publishDate: true,
        isActive: true,
        isFeatured: true,
        isPublished: true,
        createdDate: true,
        updatedDate: true,
        updatedById: true,
        PostTag: { include: { tag: { select: { id: true, name: true } } } },
      },
    });
    if (featuredPosts.length === 3 && isFeatured) {
      const oldestPostId = [...featuredPosts].sort(
        (a, b) =>
          new Date(a.publishDate!).getTime() -
          new Date(b.publishDate!).getTime()
      )[0].id;

      await db.post.update({
        where: { id: oldestPostId },
        data: { isFeatured: false },
      });
    }

    logger.info(
      { ...meta, postId: newPost.id, title: newPost.title },
      "Post created successfully!"
    );

    res
      .status(201)
      .json({ data: newPost, message: "Post created successfully!" });
  } catch (error) {
    logger.warn({ error }, "Unable to create post.");
    next(error);
  }
};

export const updatePostHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const postId = req.params.postId!;
  const role = req.user!.role;
  const authorId = req.user!.id;
  const {
    title,
    excerpt,
    content,
    tags,
    isPublished,
    isFeatured = false,
    coverImageId,
    isActive,
  } = req.body as UpdatePostModel;

  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId: authorId,
    postId,
  };
  const isAdmin = role === "ADMIN";

  try {
    logger.info(meta, "Updating Post");

    if (!isAdmin) {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be an admin to author a post.",
      });
    }

    const existingPost = await db.post.findUnique({ where: { id: postId } });
    if (!existingPost) {
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Post to update was not found!",
      });
    }

    if (coverImageId) {
      const foundImageFile = await db.file.findUnique({
        where: { id: coverImageId },
      });
      if (!foundImageFile) {
        throw new HttpError({
          status: "BAD_REQUEST",
          message: "Cover image does not exist!",
        });
      }
    }

    if (isFeatured && !isPublished) {
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "Only published posts may be featured!",
      });
    }

    const foundTagCount = await db.tag.count({
      where: {
        AND: {
          isActive: true,
          id: { in: tags },
        },
      },
    });

    if (foundTagCount !== tags.length) {
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "Invalid tags.",
      });
    }

    const slug = slugify(title).slice(0, 100);

    const featuredPosts = await db.post.findMany({
      where: { isFeatured: true },
    });
    const updatedPost = await db.$transaction(async (tx) => {
      // Clear old post tags
      await tx.postTag.deleteMany({ where: { postId } });

      // Create new tags
      await tx.postTag.createMany({
        data: tags.map((t) => ({ postId, tagId: t })),
      });

      return await tx.post.update({
        where: { id: postId },
        data: {
          title,
          excerpt,
          content,
          isFeatured,
          isPublished,
          isActive,
          slug,
          updatedById: authorId,
          publishDate:
            !existingPost.isPublished && isPublished
              ? new Date().toISOString()
              : existingPost.publishDate,
          coverImageId,
        },
        select: {
          id: true,
          title: true,
          content: true,
          slug: true,
          coverImageId: true,
          authorId: true,
          publishDate: true,
          isActive: true,
          isFeatured: true,
          isPublished: true,
          createdDate: true,
          updatedDate: true,
          updatedById: true,
          PostTag: { include: { tag: { select: { id: true, name: true } } } },
        },
      });
    });

    if (featuredPosts.length === 3 && isFeatured) {
      const oldestPostId = [...featuredPosts].sort(
        (a, b) =>
          new Date(a.publishDate!).getTime() -
          new Date(b.publishDate!).getTime()
      )[0].id;

      await db.post.update({
        where: { id: oldestPostId },
        data: { isFeatured: false },
      });
    }

    logger.info(
      { ...meta, postId: updatedPost.id, title: updatedPost.title },
      "Post updated successfully!"
    );

    res
      .status(200)
      .json({ data: updatedPost, message: "Post updated successfully!" });
  } catch (error) {
    logger.warn({ error }, "Unable to update post.");
    next(error);
  }
};

export const getPostByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const postId = req.params.postId!;
  const isAdmin = req.user?.role === "ADMIN";
  const userId = req.user?.id;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
  };
  try {
    logger.info(meta, "Locating post.");
    const foundPost = await db.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        coverImageId: true,
        authorId: true,
        publishDate: true,
        isFeatured: true,
        isPublished: true,
        ...(isAdmin && {
          isActive: true,
          createdDate: true,
          updatedDate: true,
          updatedById: true,
        }),
        PostTag: { include: { tag: { select: { id: true, name: true } } } },
      },
    });
    if (!foundPost)
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Post was not found!",
      });
    logger.info(meta, "Post was found!");
    res.status(200).json({ message: "Post was found!", data: foundPost });
  } catch (error) {
    logger.warn({ error }, "Unable to get post.");
    next(error);
  }
};

export const getPostBySlugHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const slug = req.params.slug!;
  const isAdmin = req.user?.role === "ADMIN";
  const userId = req.user?.id;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
    slug,
  };
  try {
    logger.info(meta, "Locating post.");
    const foundPost = await db.post.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        content: true,
        slug: true,
        coverImageId: true,
        authorId: true,
        publishDate: true,
        isFeatured: true,
        isPublished: true,
        ...(isAdmin && {
          isActive: true,
          createdDate: true,
          updatedDate: true,
          updatedById: true,
        }),
        PostTag: { include: { tag: { select: { id: true, name: true } } } },
      },
    });
    if (!foundPost)
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Post was not found!",
      });
    logger.info(meta, "Post was found!");
    res.status(200).json({ message: "Post was found!", data: foundPost });
  } catch (error) {
    logger.warn({ error }, "Unable to get post.");
    next(error);
  }
};

export const getManyPostsHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const meta = { ip: req.ip, method: req.method, url: req.url };
  try {
    const isAdmin = req.user?.role === "ADMIN";
    const {
      term,
      tags,
      pageIndex = "0",
      pageSize = "10",
    } = req.query as SearchPostsModel;

    const trimmedTerm = term?.trim();
    const index = Math.max(parseInt(pageIndex) - 1 || 0, 0);
    const size = Math.min(Math.max(parseInt(pageSize) || 10, 1), 50);

    const searchMeta = {
      ...meta,
      term: trimmedTerm,
      pageIndex: index + 1,
      pageSize: size,
    };

    logger.info(searchMeta, "Searching for posts.");

    const where = {
      ...(tags?.length && { PostTag: { some: { tag: { id: { in: tags } } } } }),
      ...(trimmedTerm && {
        OR: [
          { title: { contains: trimmedTerm } },
          { excerpt: { contains: trimmedTerm } },
        ],
      }),
    };

    const count = await db.post.count({ where });
    const foundPosts = await db.post.findMany({
      where,
      skip: index * size,
      take: size,
      select: {
        id: true,
        title: true,
        slug: true,
        coverImageId: true,
        authorId: true,
        publishDate: true,
        isFeatured: true,
        isPublished: true,
        ...(isAdmin && {
          isActive: true,
          createdDate: true,
          updatedDate: true,
          updatedById: true,
        }),
        PostTag: { include: { tag: { select: { id: true, name: true } } } },
      },
    });

    logger.info(searchMeta, "Found posts!");

    res.status(200).json({
      data: foundPosts,
      message: "Found posts!",
      meta: {
        pageSize: size,
        pageIndex: index + 1,
        totalPages: Math.ceil(count / size),
      },
    });
  } catch (error) {
    logger.warn({ error }, "Unable to find posts.");
    next(error);
  }
};

// Set post to inactive flag
export const deletePostHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const postId = req.params.postId;
  const userId = req.user!.id;
  const isAdmin = req.user!.role === "ADMIN";
  const meta = { ip: req.ip, method: req.method, url: req.url, postId, userId };

  try {
    logger.info(meta, "Deleting post");
    // cover image file will be deleted inside of upload manager if it needs to be removed
    if (!isAdmin)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be admin to delete post",
      });
    // post tags are deleted on cascade
    await db.post.update({ where: { id: postId }, data: { isActive: true } });
    logger.info(meta, "Post deleted!");
    return res.status(200).json({ message: "Post was deleted!" });
  } catch (error) {
    logger.warn({ error }, "Unable to delete post.");
    next(error);
  }
};

// Remove oldest featured post and add new one if count exceeds 3
export const setPostFeatured: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const postId = req.params.postId;
  const userId = req.user!.id;
  const isAdmin = req.user!.role === "ADMIN";
  const meta = { ip: req.ip, method: req.method, url: req.url, postId, userId };
  try {
    logger.info(meta, "Setting post as featured!");

    if (!isAdmin)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be admin to feature a post.",
      });

    const featuredPosts = await db.post.findMany({
      where: { isFeatured: true },
    });
    await db.post.update({ where: { id: postId }, data: { isFeatured: true } });
    if (featuredPosts.length === 3) {
      const oldestPostId = [...featuredPosts].sort(
        (a, b) =>
          new Date(a.publishDate!).getTime() -
          new Date(b.publishDate!).getTime()
      )[0].id;

      await db.post.update({
        where: { id: oldestPostId },
        data: { isFeatured: false },
      });
    }
    logger.info(meta, "Post is now featured!");
    res.status(200).json({ message: "Post was set as featured!" });
  } catch (error) {
    logger.warn({ error }, "Unable to feature post.");
    next(error);
  }
};
