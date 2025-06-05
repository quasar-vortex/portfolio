import slugify from "slugify";
import { HttpError } from "../error";
import logger from "../logger";
import { AuthenticatedRequestHandler } from "../types";
import { db } from "../db";
import {
  CreatePostModel,
  SearchPostsModel,
  UpdatePostModel,
} from "./post.models";
import { Prisma } from "../generated/prisma";

const baseSelect = {
  id: true,
  title: true,
  excerpt: true,
  content: true,
  slug: true,
  publishDate: true,
  PostTag: {
    include: { tag: { select: { id: true, name: true } } },
  },
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      avatarFile: { select: { id: true, url: true } },
    },
  },
  coverImage: {
    select: {
      id: true,
      url: true,
    },
  },
};

const adminSelect = {
  ...baseSelect,
  isActive: true,
  isFeatured: true,
  isPublished: true,
  createdDate: true,
  updatedDate: true,
  updatedById: true,
};
const createPostHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const isAdmin = req.user!.role === "ADMIN";
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

  try {
    logger.info(meta, "Creating Post");

    if (!isAdmin) {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be an admin to author a post.",
      });
    }
    const existingPost = await db.post.findUnique({ where: { title } });
    if (existingPost)
      throw new HttpError({ status: "BAD_REQUEST", message: "Title in use!" });
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

    const newPost = await db.$transaction(async (tx) => {
      if (featuredPosts.length === 3 && isFeatured) {
        const oldestPostId = [...featuredPosts].sort(
          (a, b) =>
            new Date(a.publishDate!).getTime() -
            new Date(b.publishDate!).getTime()
        )[0].id;

        await tx.post.update({
          where: { id: oldestPostId },
          data: { isFeatured: false },
        });
      }
      return await tx.post.create({
        data: {
          title,
          content,
          slug,
          excerpt,
          authorId,
          publishDate: isPublished ? new Date() : null,
          PostTag: { createMany: { data: tags.map((t) => ({ tagId: t })) } },
          isFeatured,
          isPublished,
          coverImageId,
        },
        select: adminSelect,
      });
    });

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

const updatePostHandler: AuthenticatedRequestHandler = async (
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
    if (existingPost.title !== title) {
      const newTitlePost = await db.post.findUnique({ where: { title } });
      if (newTitlePost)
        throw new HttpError({
          status: "BAD_REQUEST",
          message: "Post title in use!",
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

      if (featuredPosts.length === 3 && isFeatured) {
        const oldestPostId = [...featuredPosts].sort(
          (a, b) =>
            new Date(a.publishDate!).getTime() -
            new Date(b.publishDate!).getTime()
        )[0].id;

        await tx.post.update({
          where: { id: oldestPostId },
          data: { isFeatured: false },
        });
      }

      return await tx.post.update({
        where: { id: postId },
        data: {
          title,
          excerpt,
          content,
          isFeatured,
          isPublished,
          slug,
          updatedById: authorId,
          publishDate: isPublished
            ? existingPost.publishDate ?? new Date()
            : null,
          coverImageId: typeof coverImageId === "string" ? coverImageId : null,
        },
        select: adminSelect,
      });
    });

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

const getPostByIdHandler: AuthenticatedRequestHandler = async (
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
    const where = isAdmin ? { id: postId } : { id: postId, isActive: true };
    const select = isAdmin ? adminSelect : baseSelect;
    const foundPost = await db.post.findUnique({
      where,
      select,
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

const getPostBySlugHandler: AuthenticatedRequestHandler = async (
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
    const where = isAdmin ? { slug } : { slug, isActive: true };

    const select = isAdmin ? adminSelect : baseSelect;
    const foundPost = await db.post.findUnique({
      where,
      select,
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

const getManyPostsHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const meta = { ip: req.ip, method: req.method, url: req.url };

  try {
    const isAdmin = req.user?.role === "ADMIN";
    logger.info(`This use is ${!isAdmin && "NOT"} an Admin.`);
    const {
      term,
      tags,
      pageIndex = "1",
      pageSize = "10",
      isFeatured,
      sortOrder,
      sortKey,
    } = req.query as unknown as SearchPostsModel;

    const trimmedTerm = term?.trim();
    const index = Math.max(parseInt(pageIndex) - 1 || 0, 0);
    const size = Math.min(Math.max(parseInt(pageSize) || 10, 1), 50);
    const select = isAdmin ? adminSelect : baseSelect;

    // Sorting
    const order: "asc" | "desc" = sortOrder === "asc" ? "asc" : "desc";
    const key: string = sortKey || "publishDate";

    // isFeatured
    const searchIsFeatured =
      isFeatured === "true" ? true : isFeatured === "false" ? false : undefined;

    // conditions
    const where: Prisma.PostWhereInput = {};
    const andConditions: Prisma.PostWhereInput[] = [];

    // only admin can see unpubsished posts
    if (!isAdmin) where.isPublished = true;
    if (tags?.length) {
      where.PostTag = {
        some: {
          tag: {
            id: { in: tags.split(",") },
          },
        },
      };
    }

    if (trimmedTerm) {
      andConditions.push({
        OR: [
          { title: { contains: trimmedTerm } },
          { excerpt: { contains: trimmedTerm } },
        ],
      });
    }

    if (searchIsFeatured !== undefined) {
      andConditions.push({ isFeatured: searchIsFeatured });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }
    where.isActive = true;

    const [count, foundPosts] = await Promise.all([
      db.post.count({ where }),
      db.post.findMany({
        where,
        skip: index * size,
        take: size,
        orderBy: { [key]: order },
        select: {
          ...select,
          content: false,
        },
      }),
    ]);

    const totalPages = Math.max(1, Math.ceil(count / size));
    const searchMeta = {
      ...meta,
      pageIndex: index + 1,
      pageSize: size,
      totalPages,
      totalCount: count,
      isFeatured: searchIsFeatured,
    };

    logger.info(searchMeta, "Found posts!");

    res.status(200).json({
      data: foundPosts,
      message: "Found posts!",
      meta: searchMeta,
    });
  } catch (error) {
    logger.warn({ ...meta, error }, "Unable to find posts.");
    next(error);
  }
};

const deletePostHandler: AuthenticatedRequestHandler = async (
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
    const foundPost = await db.post.findUnique({ where: { id: postId } });
    const completedDeleted = () => {
      logger.info(meta, "Post deleted!");
      res.status(200).json({ message: "Post was deleted!" });
    };
    if (!foundPost) {
      completedDeleted();
      return;
    }
    await db.post.update({ where: { id: postId }, data: { isActive: false } });
    completedDeleted();
  } catch (error) {
    logger.warn({ error }, "Unable to delete post.");
    next(error);
  }
};

const togglePostFeatured: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const postId = req.params.postId;
  const userId = req.user!.id;
  const isAdmin = req.user!.role === "ADMIN";
  const meta = { ip: req.ip, method: req.method, url: req.url, postId, userId };

  try {
    logger.info(meta, "Toggling post as featured");

    if (!isAdmin) {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be admin to toggle featured posts.",
      });
    }

    const foundPost = await db.post.findUnique({ where: { id: postId } });

    if (!foundPost) {
      throw new HttpError({ status: "NOT_FOUND", message: "Post not found!" });
    }

    const isCurrentlyFeatured = foundPost.isFeatured;
    // turn off
    if (isCurrentlyFeatured) {
      await db.post.update({
        where: { id: postId },
        data: { isFeatured: false },
      });

      logger.info(meta, "Post unfeatured.");
      return res.status(200).json({ message: "Post unfeatured." });
    }

    // enable as featured
    const featuredPosts = await db.post.findMany({
      where: { isFeatured: true },
    });

    await db.$transaction(async (tx) => {
      if (featuredPosts.length >= 3) {
        // Unfeature the oldest featured post
        const oldestPostId = featuredPosts.sort(
          (a, b) =>
            new Date(a.publishDate!).getTime() -
            new Date(b.publishDate!).getTime()
        )[0].id;

        await tx.post.update({
          where: { id: oldestPostId },
          data: { isFeatured: false },
        });
      }

      await tx.post.update({
        where: { id: postId },
        data: { isFeatured: true },
      });
    });

    logger.info(meta, "Post featured.");
    res.status(200).json({ message: "Post featured." });
  } catch (error) {
    logger.warn({ error, meta }, "Error toggling post.");
    next(error);
  }
};

const togglePostPublished: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const postId = req.params.postId;
  const userId = req.user!.id;
  const isAdmin = req.user!.role === "ADMIN";
  const meta = { ip: req.ip, method: req.method, url: req.url, postId, userId };

  try {
    logger.info(meta, "Toggling post published status");

    if (!isAdmin) {
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be admin to toggle published status.",
      });
    }

    const foundPost = await db.post.findUnique({ where: { id: postId } });

    if (!foundPost) {
      throw new HttpError({ status: "NOT_FOUND", message: "Post not found!" });
    }

    const newStatus = !foundPost.isPublished;
    const shouldSetPublishDate = !foundPost.isPublished && newStatus;

    await db.post.update({
      where: { id: postId },
      data: {
        isPublished: newStatus,
        publishDate: shouldSetPublishDate ? new Date() : null,
      },
    });

    logger.info(meta, `Post ${newStatus ? "published" : "unpublished"}.`);
    res.status(200).json({
      message: `Post successfully ${newStatus ? "published" : "unpublished"}.`,
    });
  } catch (error) {
    logger.warn({ error, meta }, "Error toggling published status.");
    next(error);
  }
};

export {
  createPostHandler,
  updatePostHandler,
  getPostByIdHandler,
  getPostBySlugHandler,
  getManyPostsHandler,
  deletePostHandler,
  togglePostFeatured,
  togglePostPublished,
};
