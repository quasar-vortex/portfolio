"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.togglePostPublished = exports.togglePostFeatured = exports.deletePostHandler = exports.getManyPostsHandler = exports.getPostBySlugHandler = exports.getPostByIdHandler = exports.updatePostHandler = exports.createPostHandler = void 0;
const slugify_1 = __importDefault(require("slugify"));
const error_1 = require("../error");
const logger_1 = __importDefault(require("../logger"));
const db_1 = require("../db");
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
const createPostHandler = async (req, res, next) => {
    const isAdmin = req.user.role === "ADMIN";
    const authorId = req.user.id;
    const { title, excerpt, content, tags, isPublished, isFeatured = false, coverImageId, } = req.body;
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId: authorId,
    };
    try {
        logger_1.default.info(meta, "Creating Post");
        if (!isAdmin) {
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Must be an admin to author a post.",
            });
        }
        const existingPost = await db_1.db.post.findUnique({ where: { title } });
        if (existingPost)
            throw new error_1.HttpError({ status: "BAD_REQUEST", message: "Title in use!" });
        if (coverImageId) {
            const foundImageFile = await db_1.db.file.findUnique({
                where: { id: coverImageId },
            });
            if (!foundImageFile) {
                throw new error_1.HttpError({
                    status: "BAD_REQUEST",
                    message: "Cover image does not exist!",
                });
            }
        }
        if (isFeatured && !isPublished) {
            throw new error_1.HttpError({
                status: "BAD_REQUEST",
                message: "Only published posts may be featured!",
            });
        }
        const foundTagCount = await db_1.db.tag.count({
            where: {
                AND: {
                    id: { in: tags },
                },
            },
        });
        if (foundTagCount !== tags.length) {
            throw new error_1.HttpError({
                status: "BAD_REQUEST",
                message: "Invalid tags.",
            });
        }
        const slug = (0, slugify_1.default)(title).slice(0, 100);
        const featuredPosts = await db_1.db.post.findMany({
            where: { isFeatured: true },
        });
        const newPost = await db_1.db.$transaction(async (tx) => {
            if (featuredPosts.length === 3 && isFeatured) {
                const oldestPostId = [...featuredPosts].sort((a, b) => new Date(a.publishDate).getTime() -
                    new Date(b.publishDate).getTime())[0].id;
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
        logger_1.default.info({ ...meta, postId: newPost.id, title: newPost.title }, "Post created successfully!");
        res
            .status(201)
            .json({ data: newPost, message: "Post created successfully!" });
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to create post.");
        next(error);
    }
};
exports.createPostHandler = createPostHandler;
const updatePostHandler = async (req, res, next) => {
    const postId = req.params.postId;
    const role = req.user.role;
    const authorId = req.user.id;
    const { title, excerpt, content, tags, isPublished, isFeatured = false, coverImageId, } = req.body;
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId: authorId,
        postId,
    };
    const isAdmin = role === "ADMIN";
    try {
        logger_1.default.info(meta, "Updating Post");
        if (!isAdmin) {
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Must be an admin to author a post.",
            });
        }
        const existingPost = await db_1.db.post.findUnique({ where: { id: postId } });
        if (!existingPost) {
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: "Post to update was not found!",
            });
        }
        if (existingPost.title !== title) {
            const newTitlePost = await db_1.db.post.findUnique({ where: { title } });
            if (newTitlePost)
                throw new error_1.HttpError({
                    status: "BAD_REQUEST",
                    message: "Post title in use!",
                });
        }
        if (coverImageId) {
            const foundImageFile = await db_1.db.file.findUnique({
                where: { id: coverImageId },
            });
            if (!foundImageFile) {
                throw new error_1.HttpError({
                    status: "BAD_REQUEST",
                    message: "Cover image does not exist!",
                });
            }
        }
        if (isFeatured && !isPublished) {
            throw new error_1.HttpError({
                status: "BAD_REQUEST",
                message: "Only published posts may be featured!",
            });
        }
        const foundTagCount = await db_1.db.tag.count({
            where: {
                AND: {
                    id: { in: tags },
                },
            },
        });
        if (foundTagCount !== tags.length) {
            throw new error_1.HttpError({
                status: "BAD_REQUEST",
                message: "Invalid tags.",
            });
        }
        const slug = (0, slugify_1.default)(title).slice(0, 100);
        const featuredPosts = await db_1.db.post.findMany({
            where: { isFeatured: true },
        });
        const updatedPost = await db_1.db.$transaction(async (tx) => {
            // Clear old post tags
            await tx.postTag.deleteMany({ where: { postId } });
            // Create new tags
            await tx.postTag.createMany({
                data: tags.map((t) => ({ postId, tagId: t })),
            });
            if (featuredPosts.length === 3 && isFeatured) {
                const oldestPostId = [...featuredPosts].sort((a, b) => new Date(a.publishDate).getTime() -
                    new Date(b.publishDate).getTime())[0].id;
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
        logger_1.default.info({ ...meta, postId: updatedPost.id, title: updatedPost.title }, "Post updated successfully!");
        res
            .status(200)
            .json({ data: updatedPost, message: "Post updated successfully!" });
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to update post.");
        next(error);
    }
};
exports.updatePostHandler = updatePostHandler;
const getPostByIdHandler = async (req, res, next) => {
    const postId = req.params.postId;
    const isAdmin = req.user?.role === "ADMIN";
    const userId = req.user?.id;
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId,
    };
    try {
        logger_1.default.info(meta, "Locating post.");
        const where = isAdmin ? { id: postId } : { id: postId, isActive: true };
        const select = isAdmin ? adminSelect : baseSelect;
        const foundPost = await db_1.db.post.findUnique({
            where,
            select,
        });
        if (!foundPost)
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: "Post was not found!",
            });
        logger_1.default.info(meta, "Post was found!");
        res.status(200).json({ message: "Post was found!", data: foundPost });
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to get post.");
        next(error);
    }
};
exports.getPostByIdHandler = getPostByIdHandler;
const getPostBySlugHandler = async (req, res, next) => {
    const slug = req.params.slug;
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
        logger_1.default.info(meta, "Locating post.");
        const where = isAdmin ? { slug } : { slug, isActive: true };
        const select = isAdmin ? adminSelect : baseSelect;
        const foundPost = await db_1.db.post.findUnique({
            where,
            select,
        });
        if (!foundPost)
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: "Post was not found!",
            });
        logger_1.default.info(meta, "Post was found!");
        res.status(200).json({ message: "Post was found!", data: foundPost });
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to get post.");
        next(error);
    }
};
exports.getPostBySlugHandler = getPostBySlugHandler;
const getManyPostsHandler = async (req, res, next) => {
    const meta = { ip: req.ip, method: req.method, url: req.url };
    try {
        const isAdmin = req.user?.role === "ADMIN";
        const { term, tags, pageIndex = "1", pageSize = "10", isFeatured, sortOrder, sortKey, } = req.query;
        const trimmedTerm = term?.trim();
        const index = Math.max(parseInt(pageIndex) - 1 || 0, 0);
        const size = Math.min(Math.max(parseInt(pageSize) || 10, 1), 50);
        const select = isAdmin ? adminSelect : baseSelect;
        const order = sortOrder === "asc" ? "asc" : "desc";
        const key = sortKey || "publishDate";
        const where = {
            isActive: true,
            ...(isAdmin ? {} : { isPublished: true }),
        };
        const andConditions = [];
        if (trimmedTerm) {
            andConditions.push({
                OR: [
                    { title: { contains: trimmedTerm } },
                    { excerpt: { contains: trimmedTerm } },
                ],
            });
        }
        if (isFeatured === "true") {
            andConditions.push({ isFeatured: true });
        }
        else if (isFeatured === "false") {
            andConditions.push({ isFeatured: false });
        }
        if (tags?.length) {
            where.PostTag = {
                some: {
                    tag: {
                        id: { in: tags.split(",") },
                    },
                },
            };
        }
        if (andConditions.length > 0) {
            where.AND = andConditions;
        }
        const [count, foundPosts] = await Promise.all([
            db_1.db.post.count({ where }),
            db_1.db.post.findMany({
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
            isFeatured,
            where,
        };
        logger_1.default.info(searchMeta, "Found posts!");
        res.status(200).json({
            data: foundPosts,
            message: "Found posts!",
            meta: searchMeta,
        });
    }
    catch (error) {
        logger_1.default.warn({ ...meta, error }, "Unable to find posts.");
        next(error);
    }
};
exports.getManyPostsHandler = getManyPostsHandler;
const deletePostHandler = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.user.id;
    const isAdmin = req.user.role === "ADMIN";
    const meta = { ip: req.ip, method: req.method, url: req.url, postId, userId };
    try {
        logger_1.default.info(meta, "Deleting post");
        // cover image file will be deleted inside of upload manager if it needs to be removed
        if (!isAdmin)
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Must be admin to delete post",
            });
        const foundPost = await db_1.db.post.findUnique({ where: { id: postId } });
        const completedDeleted = () => {
            logger_1.default.info(meta, "Post deleted!");
            res.status(200).json({ message: "Post was deleted!" });
        };
        if (!foundPost) {
            completedDeleted();
            return;
        }
        await db_1.db.post.update({ where: { id: postId }, data: { isActive: false } });
        completedDeleted();
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to delete post.");
        next(error);
    }
};
exports.deletePostHandler = deletePostHandler;
const togglePostFeatured = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.user.id;
    const isAdmin = req.user.role === "ADMIN";
    const meta = { ip: req.ip, method: req.method, url: req.url, postId, userId };
    try {
        logger_1.default.info(meta, "Toggling post as featured");
        if (!isAdmin) {
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Must be admin to toggle featured posts.",
            });
        }
        const foundPost = await db_1.db.post.findUnique({ where: { id: postId } });
        if (!foundPost) {
            throw new error_1.HttpError({ status: "NOT_FOUND", message: "Post not found!" });
        }
        const isCurrentlyFeatured = foundPost.isFeatured;
        // turn off
        if (isCurrentlyFeatured) {
            await db_1.db.post.update({
                where: { id: postId },
                data: { isFeatured: false },
            });
            logger_1.default.info(meta, "Post unfeatured.");
            return res.status(200).json({ message: "Post unfeatured." });
        }
        // enable as featured
        const featuredPosts = await db_1.db.post.findMany({
            where: { isFeatured: true },
        });
        await db_1.db.$transaction(async (tx) => {
            if (featuredPosts.length >= 3) {
                // Unfeature the oldest featured post
                const oldestPostId = featuredPosts.sort((a, b) => new Date(a.publishDate).getTime() -
                    new Date(b.publishDate).getTime())[0].id;
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
        logger_1.default.info(meta, "Post featured.");
        res.status(200).json({ message: "Post featured." });
    }
    catch (error) {
        logger_1.default.warn({ error, meta }, "Error toggling post.");
        next(error);
    }
};
exports.togglePostFeatured = togglePostFeatured;
const togglePostPublished = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.user.id;
    const isAdmin = req.user.role === "ADMIN";
    const meta = { ip: req.ip, method: req.method, url: req.url, postId, userId };
    try {
        logger_1.default.info(meta, "Toggling post published status");
        if (!isAdmin) {
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Must be admin to toggle published status.",
            });
        }
        const foundPost = await db_1.db.post.findUnique({ where: { id: postId } });
        if (!foundPost) {
            throw new error_1.HttpError({ status: "NOT_FOUND", message: "Post not found!" });
        }
        const newStatus = !foundPost.isPublished;
        const shouldSetPublishDate = !foundPost.isPublished && newStatus;
        await db_1.db.post.update({
            where: { id: postId },
            data: {
                isPublished: newStatus,
                publishDate: shouldSetPublishDate ? new Date() : null,
            },
        });
        logger_1.default.info(meta, `Post ${newStatus ? "published" : "unpublished"}.`);
        res.status(200).json({
            message: `Post successfully ${newStatus ? "published" : "unpublished"}.`,
        });
    }
    catch (error) {
        logger_1.default.warn({ error, meta }, "Error toggling published status.");
        next(error);
    }
};
exports.togglePostPublished = togglePostPublished;
