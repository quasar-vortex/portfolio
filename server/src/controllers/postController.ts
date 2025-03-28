import slugify from "slugify";
import { db } from "../db";
import {
  CreateNewPostModel,
  QueryPostsModel,
  UpdatePostModel,
} from "../models/postModels";
import { apiUtils, asyncHandler } from "../utils";
import HttpError from "../error";
import { S3UploadedFile } from "../types";
import logger from "../logger";
import fileUtils from "../utils/fileUtils";

export const createNewPostHandler = asyncHandler(async (req, res, next) => {
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user!.id,
  };
  logger.info(logMeta, "Request to create post received.");

  const coverImageFile = req.file as S3UploadedFile | undefined;

  try {
    // Extract post data
    const { authorId, content, isPublished, tags, title, excerpt } =
      req.body as CreateNewPostModel;

    // Validate tag IDs
    const foundTagCount = await db.tag.count({ where: { id: { in: tags } } });

    // Remove file and throw error if invalid tags
    if (foundTagCount !== tags.length) {
      logger.error(logMeta, "An Invalid Tag Was Passed.");
      if (coverImageFile) {
        await fileUtils.deleteFile(coverImageFile.key);
      }
      throw new HttpError({
        statusMessage: "NOT_FOUND",
        message: "Invalid Tag ID Passed.",
      });
    }

    // Transaction: Create post and link tags
    const newPost = await db.$transaction(async (tx) => {
      // Create DB record if cover image provided
      let coverImageId = null;
      if (coverImageFile) {
        const dbFile = await tx.file.create({
          data: {
            key: coverImageFile.key,
            originalName: coverImageFile.originalname,
            size: coverImageFile.size,
            url: coverImageFile.location,
            uploaderId: req.user!.id,
          },
        });
        coverImageId = dbFile.id;
      }
      const post = await tx.post.create({
        data: {
          authorId,
          content,
          isPublished,
          title,
          excerpt,
          slug: slugify(title).slice(0, 100),
          coverImageId,
          publishDate: isPublished ? new Date() : undefined,
        },
      });

      // Link tags to the post
      await tx.postTag.createMany({
        data: tags.map((t) => ({ tagId: t, postId: post.id })),
      });

      return post;
    });

    // Fetch the created post
    const post = await db.post.findFirst({
      where: { id: newPost.id },
      select: {
        id: true,
        title: true,
        excerpt: true,
        content: true,
        authorId: true,
        isFeatured: true,
        isPublished: true,
        publishDate: true,
        coverImage: { select: { id: true, url: true } },
        slug: true,
        dateCreated: true,
        dateUpdated: true,
        PostTag: { select: { tag: { select: { id: true, name: true } } } },
      },
    });

    if (!post) {
      logger.error({ ...logMeta, postId: newPost.id }, "Post Not Found.");
      throw new HttpError({
        statusMessage: "NOT_FOUND",
        message: "Post Was Not Found.",
      });
    }

    logger.info({ ...logMeta, postId: post.id }, "Post Created Successfully.");
    res.status(201).json(
      apiUtils.formatApiResponse({
        data: post,
        message: "Post Created Successfully",
      })
    );
  } catch (error) {
    logger.error(logMeta, "Failed to Create Post and Link Tags");

    // Cleanup uploaded file if transaction fails
    if (coverImageFile) {
      await fileUtils.deleteFile(coverImageFile.key);
    }

    throw new HttpError({
      statusMessage: "INTERNAL_ERROR",
      message: "Unable to Create Post",
    });
  }
});

export const getPostBySlugHandler = asyncHandler(async (req, res, next) => {
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user!.id,
  };
  const slug = req.params.slug;
  const foundPost = await db.post.findUnique({
    where: { slug, isPublished: true },
    select: {
      id: true,
      title: true,
      excerpt: true,
      content: true,
      authorId: true,
      isFeatured: true,
      isPublished: true,
      publishDate: true,
      coverImage: { select: { id: true, url: true } },
      slug: true,
      PostTag: { select: { tag: { select: { id: true, name: true } } } },
    },
  });
  // Check for post
  if (!foundPost) {
    logger.error({ ...logMeta, slug }, "Post Not Found");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "Post Was Not Found.",
    });
  }

  logger.info(
    { ...logMeta, postId: foundPost.id },
    "Post Retrieved Successfully."
  );
  res.status(200).json(
    apiUtils.formatApiResponse({
      data: foundPost,
      message: "Post Retrieved Successfully",
    })
  );
});
// Requires admin or author role
export const getPostByIdHandler = asyncHandler(async (req, res, next) => {
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user!.id,
  };
  // Check for admin or author role
  if (req.user!.role !== "ADMIN" && req.user!.role !== "AUTHOR") {
    logger.error(
      logMeta,
      "Attempt to Retrieve Post Details Without Proper Role."
    );
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "Unable to retrieved post details.",
    });
  }
  const slug = req.params.slug;
  const foundPost = await db.post.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      excerpt: true,
      content: true,
      authorId: true,
      isFeatured: true,
      isPublished: true,
      publishDate: true,
      coverImage: { select: { id: true, url: true } },
      slug: true,
      dateCreated: true,
      dateUpdated: true,
      PostTag: { select: { tag: { select: { id: true, name: true } } } },
    },
  });
  if (!foundPost) {
    logger.error({ ...logMeta, slug }, "Post Not Found");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "Post Was Not Found.",
    });
  }

  logger.info(
    { ...logMeta, postId: foundPost.id },
    "Post Retrieved Successfully."
  );
  res.status(200).json(
    apiUtils.formatApiResponse({
      data: foundPost,
      message: "Post Retrieved Successfully",
    })
  );
});
export const updatePostByIdHandler = asyncHandler(async (req, res, next) => {
  const coverImg = req.file as S3UploadedFile | undefined;
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user!.id,
  };
  const { title, content, isPublished, tags, excerpt } =
    req.body as UpdatePostModel;
  const signedInId = req.user!.id;
  const role = req.user!.role;

  const foundPost = await db.post.findUnique({
    where: { id: req.params.postId },
    include: { coverImage: true },
  });

  // Check for post
  if (!foundPost) {
    logger.error({ ...logMeta, postId: req.params.postId }, "Post Not Found");
    if (coverImg) await fileUtils.deleteFile(coverImg.key);
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "Post Was Not Found.",
    });
  }
  // Validate user own's post or is admin
  if (foundPost.authorId !== signedInId && role !== "ADMIN") {
    if (coverImg) await fileUtils.deleteFile(coverImg.key);
    logger.error(logMeta, "Attempt to update another's post.");
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "Unable to modify another's post.",
    });
  }
  // Validate tag IDs
  const foundTagCount = await db.tag.count({ where: { id: { in: tags } } });

  // Remove file and throw error if invalid tags
  if (foundTagCount !== tags.length) {
    logger.error(logMeta, "An Invalid Tag Was Passed.");
    if (coverImg) {
      await fileUtils.deleteFile(coverImg.key);
    }
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "Invalid Tag ID Passed.",
    });
  }

  try {
    await db.$transaction(async (tx) => {
      let coverId = null;
      // add file to DB
      if (coverImg) {
        const dbFile = await tx.file.create({
          data: {
            key: coverImg.key,
            originalName: coverImg.originalname,
            size: coverImg.size,
            url: coverImg.location,
            uploaderId: req.user!.id,
          },
        });
        coverId = dbFile.id;
      }
      const post = await tx.post.update({
        where: { id: foundPost.id },
        data: {
          content,
          isPublished,
          title,
          excerpt,
          slug: slugify(title).slice(0, 100),
          coverImageId: coverId,
          publishDate: isPublished ? new Date() : undefined,
        },
      });

      await tx.postTag.deleteMany();
      await tx.postTag.createMany({
        data: tags.map((t) => ({ tagId: t, postId: post.id })),
      });
    });
    // remove old file after transaction
    if (foundPost.coverImage) {
      await fileUtils.deleteFile(foundPost.coverImage!.key!);
      await db.file.delete({ where: { id: foundPost.coverImage.id } });
    }

    // Fetch the created post
    const post = await db.post.findFirst({
      where: { id: foundPost.id },
      select: {
        id: true,
        title: true,
        excerpt: true,
        content: true,
        authorId: true,
        isFeatured: true,
        isPublished: true,
        publishDate: true,
        coverImage: { select: { id: true, url: true } },
        slug: true,
        dateCreated: true,
        dateUpdated: true,
        PostTag: { select: { tag: { select: { id: true, name: true } } } },
      },
    });

    if (!post) {
      logger.error({ ...logMeta, postId: foundPost.id }, "Post Not Found.");
      throw new HttpError({
        statusMessage: "NOT_FOUND",
        message: "Post Was Not Found.",
      });
    }

    logger.info({ ...logMeta, postId: post.id }, "Post Updated Successfully.");
    res.status(200).json(
      apiUtils.formatApiResponse({
        data: post,
        message: "Post Updated Successfully",
      })
    );
  } catch (error) {
    logger.error(logMeta, "Failed to Update Post and Link Tags");

    // Cleanup uploaded file if transaction fails
    if (coverImg) {
      await fileUtils.deleteFile(coverImg.key);
    }

    throw new HttpError({
      statusMessage: "INTERNAL_ERROR",
      message: "Unable to Update Post",
    });
  }
});

export const setPostPublishStatusHandler = asyncHandler(
  async (req, res, next) => {
    const logMeta = {
      method: req.method,
      url: req.url,
      ip: req.ip,
      signedInId: req.user!.id,
    };
    const postId = req.params.postId;
    const signedInId = req.user!.id;
    const role = req.user!.role;

    const { isPublished } = req.body;
    const foundPost = await db.post.findUnique({ where: { id: postId } });

    // Check for post
    if (!foundPost) {
      logger.error({ ...logMeta, postId: req.params.postId }, "Post Not Found");

      throw new HttpError({
        statusMessage: "NOT_FOUND",
        message: "Post Was Not Found.",
      });
    }

    if (signedInId !== foundPost.authorId && role !== "ADMIN") {
      logger.error(
        { ...logMeta, postId: req.params.postId },
        "Unable to update another's post."
      );
      throw new HttpError({
        statusMessage: "NOT_AUTHORIZED",
        message: "Not Allowed to Change Another's Post Status",
      });
    }
    await db.post.update({
      where: { id: postId },
      data: { isPublished, publishDate: isPublished ? new Date() : undefined },
    });
    res.status(200).json(
      apiUtils.formatApiResponse({
        data: { ...foundPost, isPublished },
        message: "Post Updated Successfully",
      })
    );
  }
);
// Only admin can set is featured
export const setPostFeaturedStatusHandler = asyncHandler(
  async (req, res, next) => {
    const logMeta = {
      method: req.method,
      url: req.url,
      ip: req.ip,
      signedInId: req.user!.id,
    };
    const postId = req.params.postId;
    const signedInId = req.user!.id;
    const role = req.user!.role;

    const { isFeatured } = req.body;
    const foundPost = await db.post.findUnique({ where: { id: postId } });

    // Check for post
    if (!foundPost) {
      logger.error({ ...logMeta, postId: req.params.postId }, "Post Not Found");

      throw new HttpError({
        statusMessage: "NOT_FOUND",
        message: "Post Was Not Found.",
      });
    }

    if (signedInId !== foundPost.authorId && role !== "ADMIN") {
      logger.error(
        { ...logMeta, postId: req.params.postId },
        "Unable to update another's post."
      );
      throw new HttpError({
        statusMessage: "NOT_AUTHORIZED",
        message: "Not Allowed to Change Another's Post Status",
      });
    }
    // get count of featured
    const foundFeaturedCount = await db.post.count({
      where: { isFeatured: true },
    });
    // max of 3 featured
    if (foundFeaturedCount === 3) {
      const firstFeaturedItem = await db.post.findFirst({
        where: { isFeatured },
        orderBy: { publishDate: "desc", dateCreated: "desc" },
      });
      // Error if not found
      if (!firstFeaturedItem) {
        logger.error(logMeta, "Unable to find featured post.");
        throw new HttpError({
          statusMessage: "NOT_FOUND",
          message: "Featured Post Not Found",
        });
      }
      // Set to not featured
      await db.post.update({
        where: { id: firstFeaturedItem.id },
        data: { isFeatured: false },
      });
    }
    // Set post being updated to featured
    await db.post.update({
      where: { id: postId },
      data: { isFeatured },
    });
    res.status(200).json(
      apiUtils.formatApiResponse({
        data: { ...foundPost, isFeatured },
        message: "Post Updated Successfully",
      })
    );
  }
);
export const getManyPostsHandler = asyncHandler(async (req, res, next) => {
  const { pageIndex, pageSize, searchTerm } = req.query as QueryPostsModel;

  logger.info(
    { userId: req.user!.id, searchTerm, pageIndex, pageSize },
    "Fetching posts..."
  );

  // Trim search term if provided
  const trimmedSearchTerm = searchTerm?.trim();

  // Define search filter (no need for `mode: "insensitive"` in MySQL)
  const where = trimmedSearchTerm
    ? {
        OR: [
          { title: { contains: trimmedSearchTerm } },
          { excerpt: { contains: trimmedSearchTerm } },
        ],
      }
    : {};

  // Pagination Handling (Ensure valid values)
  const parsedPageIndex = Math.max(1, Number(pageIndex) || 1) - 1;
  const parsedPageSize = Math.max(1, Number(pageSize) || 10);
  const skip = parsedPageIndex * parsedPageSize;

  // Get total count
  const totalRecords = await db.post.count({ where });

  // Fetch paginated posts
  const foundPosts = await db.post.findMany({
    where,
    skip,
    take: parsedPageSize,
    select: {
      id: true,
      title: true,
      excerpt: true,
      content: true,
      authorId: true,
      isFeatured: true,
      isPublished: true,
      publishDate: true,
      coverImage: { select: { id: true, url: true } },
      slug: true,
      PostTag: { select: { tag: { select: { id: true, name: true } } } },
      dateCreated: req.user?.role === "ADMIN" || false,
      dateUpdated: req.user?.role === "ADMIN" || false,
    },
  });

  // Calculate total pages (ensure at least 1)
  const totalPages = Math.max(1, Math.ceil(totalRecords / parsedPageSize));

  logger.info(
    { userId: req.user!.id, totalRecords },
    "Posts retrieved successfully."
  );

  // Return response
  res.status(200).json(
    apiUtils.formatApiResponse({
      data: foundPosts,
      currentPage: parsedPageIndex + 1,
      totalPages,
      totalRecords,
      message: "Posts retrieved successfully",
    })
  );
});
export const deletePostByIdHandler = asyncHandler(async (req, res, next) => {
  const signedInId = req.user!.id;
  const postId = req.params.postId;
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId,
    postId,
  };
  logger.info(logMeta, "Request to delete post received.");
  const foundPost = await db.post.findUnique({
    where: { id: postId },
    include: { coverImage: true },
  });

  if (!foundPost) {
    logger.error(logMeta, "Post Not Found");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "Post Not Found!",
    });
  }

  // Check if owner or admin
  const isAuthorized =
    signedInId === foundPost.authorId || req.user!.role === "ADMIN";
  if (!isAuthorized) {
    logger.error(logMeta, "Must be admin or owner of post to delete.");
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "Must Be Owner of Post or Admin.",
    });
  }

  try {
    await db.$transaction(async (t) => {
      // Clean Up Cover Image File
      if (foundPost.coverImage) {
        await db.file.delete({ where: { id: foundPost.coverImage.id } });
        // Remove image after record removed, could potentially recover images
        await fileUtils.deleteFile(foundPost.coverImage.key);
      }
      // Remove post from DB, tags cascade delete automatically in prisma
      await db.post.delete({ where: { id: postId } });
    });

    logger.info(logMeta, "Post Deleted Successfully.");
    res
      .status(200)
      .json(
        apiUtils.formatApiResponse({ message: "Post Deleted Successfully." })
      );
  } catch (error) {
    logger.error(logMeta, "Failed to Delete Post");

    throw new HttpError({
      statusMessage: "INTERNAL_ERROR",
      message: "Unable to Delete Post",
    });
  }
});

export default {
  createNewPostHandler,
  getPostBySlugHandler,
  getPostByIdHandler,
  updatePostByIdHandler,
  setPostPublishStatusHandler,
  setPostFeaturedStatusHandler,
  getManyPostsHandler,
  deletePostByIdHandler,
};
