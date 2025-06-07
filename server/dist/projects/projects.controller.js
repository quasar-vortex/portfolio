"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleProjectPublished = exports.toggleProjectFeatured = exports.deleteProjectByIdHandler = exports.getManyProjectsHandler = exports.getProjectBySlugHandler = exports.getProjectByIdHandler = exports.updateProjectHandler = exports.createProjectHandler = void 0;
const slugify_1 = __importDefault(require("slugify"));
const logger_1 = __importDefault(require("../logger"));
const db_1 = require("../db");
const error_1 = require("../error");
const baseProjectSelect = {
    id: true,
    title: true,
    slug: true,
    description: true,
    isFeatured: true,
    isPublished: true,
    publishDate: true,
    codeUrl: true,
    liveUrl: true,
    content: true,
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
    ProjectTag: {
        include: { tag: { select: { id: true, name: true } } },
    },
};
const adminProjectSelect = {
    ...baseProjectSelect,
    isActive: true,
    updatedBy: true,
    updatedById: true,
    updatedDate: true,
    createdDate: true,
};
const createProjectHandler = async (req, res, next) => {
    const isAdmin = req.user.role === "ADMIN";
    const userId = req.user.id;
    const meta = { ip: req.ip, method: req.method, url: req.url, userId };
    try {
        if (!isAdmin)
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Only an admin may create a project!",
            });
        const { title, description, isFeatured, isPublished, coverImageId, tags, content, codeUrl, liveUrl, } = req.body;
        logger_1.default.info(meta, "Creating new project!");
        const slug = (0, slugify_1.default)(title).slice(0, 100);
        const existing = await db_1.db.project.findUnique({ where: { slug } });
        if (existing)
            throw new error_1.HttpError({
                status: "BAD_REQUEST",
                message: `Title, ${title} already in use!`,
            });
        if (isFeatured && !isPublished) {
            throw new error_1.HttpError({
                status: "BAD_REQUEST",
                message: "Only published projects may be featured!",
            });
        }
        if (coverImageId) {
            const foundImage = await db_1.db.file.findUnique({
                where: { id: coverImageId },
            });
            if (!foundImage) {
                throw new error_1.HttpError({
                    status: "BAD_REQUEST",
                    message: "Cover image does not exist!",
                });
            }
        }
        const newProject = await db_1.db.$transaction(async (tx) => {
            const foundTags = await tx.tag.findMany({
                where: { id: { in: tags } },
            });
            if (foundTags.length !== tags.length) {
                const tagMap = new Set(foundTags.map((t) => t.id));
                for (const tagId of tags) {
                    if (!tagMap.has(tagId)) {
                        throw new error_1.HttpError({
                            status: "BAD_REQUEST",
                            message: `Invalid tag id: ${tagId}`,
                        });
                    }
                }
            }
            if (isFeatured) {
                const featuredProjects = await tx.project.findMany({
                    where: { isFeatured: true },
                    orderBy: { publishDate: "asc" },
                });
                if (featuredProjects.length >= 3) {
                    await tx.project.update({
                        where: { id: featuredProjects[0].id },
                        data: { isFeatured: false },
                    });
                }
            }
            return await tx.project.create({
                data: {
                    authorId: userId,
                    slug,
                    title,
                    description,
                    isFeatured,
                    isPublished,
                    coverImageId,
                    codeUrl,
                    liveUrl,
                    publishDate: isPublished ? new Date() : null,
                    content,
                    ProjectTag: {
                        createMany: { data: tags.map((tagId) => ({ tagId })) },
                    },
                },
                select: adminProjectSelect,
            });
        });
        logger_1.default.info({ ...meta, projectId: newProject.id }, "Project created!");
        res.status(201).json({
            data: newProject,
            message: "Project created successfully!",
        });
    }
    catch (error) {
        logger_1.default.warn({ error, ...meta }, "Unable to create project!");
        next(error);
    }
};
exports.createProjectHandler = createProjectHandler;
const updateProjectHandler = async (req, res, next) => {
    const projectId = req.params.projectId;
    const isAdmin = req.user.role === "ADMIN";
    const userId = req.user.id;
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId,
        projectId,
    };
    try {
        if (!isAdmin)
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Only an admin may update a project!",
            });
        const { title, description, isFeatured, isPublished, coverImageId, tags, content, codeUrl, liveUrl, } = req.body;
        logger_1.default.info(meta, "Updating project");
        const foundProject = await db_1.db.project.findUnique({
            where: { id: projectId },
        });
        if (!foundProject)
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: "Project was not found!",
            });
        const slug = (0, slugify_1.default)(title).slice(0, 100);
        if (title !== foundProject.title) {
            const existingSlug = await db_1.db.project.findUnique({ where: { slug } });
            if (existingSlug)
                throw new error_1.HttpError({
                    status: "BAD_REQUEST",
                    message: `Project title/slug already in use: ${slug}`,
                });
        }
        if (isFeatured && !isPublished) {
            throw new error_1.HttpError({
                status: "BAD_REQUEST",
                message: "Only published projects may be featured!",
            });
        }
        if (coverImageId) {
            const foundImage = await db_1.db.file.findUnique({
                where: { id: coverImageId },
            });
            if (!foundImage) {
                throw new error_1.HttpError({
                    status: "BAD_REQUEST",
                    message: "Cover image does not exist!",
                });
            }
        }
        const updatedProject = await db_1.db.$transaction(async (tx) => {
            const foundTags = await tx.tag.findMany({
                where: { id: { in: tags } },
            });
            if (foundTags.length !== tags.length) {
                const tagSet = new Set(foundTags.map((t) => t.id));
                for (const tagId of tags) {
                    if (!tagSet.has(tagId)) {
                        throw new error_1.HttpError({
                            status: "BAD_REQUEST",
                            message: `Invalid tag id: ${tagId}`,
                        });
                    }
                }
            }
            await tx.projectTag.deleteMany({ where: { projectId } });
            if (isFeatured) {
                const featuredProjects = await tx.project.findMany({
                    where: { isFeatured: true },
                    orderBy: { publishDate: "asc" },
                });
                if (featuredProjects.length >= 3 && !foundProject.isFeatured) {
                    await tx.project.update({
                        where: { id: featuredProjects[0].id },
                        data: { isFeatured: false },
                    });
                }
            }
            return await tx.project.update({
                where: { id: projectId },
                data: {
                    slug,
                    title,
                    description,
                    isFeatured,
                    isPublished,
                    coverImageId,
                    codeUrl,
                    liveUrl,
                    publishDate: isPublished
                        ? foundProject.publishDate ?? new Date()
                        : null,
                    content,
                    ProjectTag: {
                        createMany: {
                            data: tags.map((tagId) => ({ tagId })),
                        },
                    },
                    updatedById: userId,
                    updatedDate: new Date(),
                },
                select: adminProjectSelect,
            });
        });
        logger_1.default.info({ ...meta, projectId: updatedProject.id }, "Project updated!");
        res.status(200).json({
            data: updatedProject,
            message: "Project updated successfully!",
        });
    }
    catch (error) {
        logger_1.default.warn({ error, ...meta }, "Unable to update project!");
        next(error);
    }
};
exports.updateProjectHandler = updateProjectHandler;
const getProjectByIdHandler = async (req, res, next) => {
    const projectId = req.params.projectId;
    const isAdmin = req.user?.role === "ADMIN";
    const userId = req.user?.id;
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId,
        projectId,
    };
    try {
        logger_1.default.info(meta, "Locating project");
        const where = isAdmin
            ? { id: projectId }
            : { id: projectId, isActive: true, isPublished: true };
        const select = isAdmin ? adminProjectSelect : baseProjectSelect;
        const foundProject = await db_1.db.project.findUnique({
            where,
            select: { ...select, content: true },
        });
        if (!foundProject) {
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: "Project was not found!",
            });
        }
        logger_1.default.info(meta, "Project was found");
        res.status(200).json({
            message: "Project was found!",
            data: foundProject,
        });
    }
    catch (error) {
        logger_1.default.warn({ ...meta, error }, "Unable to get project");
        next(error);
    }
};
exports.getProjectByIdHandler = getProjectByIdHandler;
const getProjectBySlugHandler = async (req, res, next) => {
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
        logger_1.default.info(meta, "Locating project by slug");
        const where = isAdmin
            ? { slug }
            : { slug, isActive: true, isPublished: true };
        const select = isAdmin ? adminProjectSelect : baseProjectSelect;
        const foundProject = await db_1.db.project.findUnique({
            where,
            select: { ...select, content: true },
        });
        if (!foundProject) {
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: "Project was not found!",
            });
        }
        logger_1.default.info(meta, "Project was found");
        res.status(200).json({
            message: "Project was found!",
            data: foundProject,
        });
    }
    catch (error) {
        logger_1.default.warn({ ...meta, error }, "Unable to get project by slug");
        next(error);
    }
};
exports.getProjectBySlugHandler = getProjectBySlugHandler;
const getManyProjectsHandler = async (req, res, next) => {
    const isAdmin = req.user?.role === "ADMIN";
    const userId = req.user?.id;
    const meta = { ip: req.ip, method: req.method, url: req.url, userId };
    try {
        logger_1.default.info(meta, "Fetching many projects");
        const { term, tags, isFeatured, pageIndex = "1", pageSize = "10", sortOrder, sortKey, } = req.query;
        const trimmedTerm = term?.trim();
        const index = Math.max(parseInt(pageIndex) - 1 || 0, 0);
        const size = Math.min(Math.max(parseInt(pageSize) || 10, 1), 50);
        const select = isAdmin ? adminProjectSelect : baseProjectSelect;
        const order = sortOrder === "asc" ? "asc" : "desc";
        const key = sortKey || "publishDate";
        const where = {};
        const andConditions = [];
        if (!isAdmin) {
            where.isPublished = true;
            where.isActive = true;
        }
        if (tags?.length) {
            where.ProjectTag = {
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
                    { description: { contains: trimmedTerm } },
                ],
            });
        }
        const searchIsFeatured = isFeatured === "true" ? true : isFeatured === "false" ? false : undefined;
        if (searchIsFeatured !== undefined) {
            andConditions.push({ isFeatured: searchIsFeatured });
        }
        if (andConditions.length > 0) {
            where.AND = andConditions;
        }
        const [count, foundProjects] = await Promise.all([
            db_1.db.project.count({ where }),
            db_1.db.project.findMany({
                where,
                skip: index * size,
                take: size,
                orderBy: { [key]: order },
                select: { ...select, content: false },
            }),
        ]);
        const totalPages = Math.max(1, Math.ceil(count / size));
        logger_1.default.info({
            ...meta,
            pageIndex: index + 1,
            pageSize: size,
            totalCount: count,
            totalPages,
            isFeatured: searchIsFeatured,
        }, "Found projects");
        res.status(200).json({
            data: foundProjects,
            message: "Found projects!",
            meta: {
                pageIndex: index + 1,
                pageSize: size,
                totalCount: count,
                totalPages,
            },
        });
    }
    catch (error) {
        logger_1.default.warn({ ...meta, error }, "Unable to get projects");
        next(error);
    }
};
exports.getManyProjectsHandler = getManyProjectsHandler;
const deleteProjectByIdHandler = async (req, res, next) => {
    const projectId = req.params.projectId;
    const isAdmin = req.user.role === "ADMIN";
    const userId = req.user.id;
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId,
        projectId,
    };
    try {
        logger_1.default.info(meta, "Deleting project");
        if (!isAdmin)
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Only an admin may delete a project!",
            });
        const foundProject = await db_1.db.project.findUnique({
            where: { id: projectId },
        });
        const completeDelete = () => {
            logger_1.default.info(meta, "Project deleted");
            res.status(200).json({ message: "Project was deleted!" });
        };
        if (!foundProject) {
            completeDelete();
            return;
        }
        await db_1.db.project.update({
            where: { id: projectId },
            data: {
                isActive: false,
                isFeatured: false,
                isPublished: false,
            },
        });
        completeDelete();
    }
    catch (error) {
        logger_1.default.warn({ ...meta, error }, "Unable to delete project");
        next(error);
    }
};
exports.deleteProjectByIdHandler = deleteProjectByIdHandler;
const toggleProjectFeatured = async (req, res, next) => {
    const projectId = req.params.projectId;
    const userId = req.user.id;
    const isAdmin = req.user.role === "ADMIN";
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId,
        projectId,
    };
    try {
        logger_1.default.info(meta, "Toggling project as featured");
        if (!isAdmin) {
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Must be admin to toggle featured projects.",
            });
        }
        const project = await db_1.db.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: "Project not found!",
            });
        }
        if (project.isFeatured) {
            await db_1.db.project.update({
                where: { id: projectId },
                data: { isFeatured: false },
            });
            logger_1.default.info(meta, "Project unfeatured");
            return res.status(200).json({ message: "Project unfeatured." });
        }
        const featuredProjects = await db_1.db.project.findMany({
            where: { isFeatured: true },
            orderBy: { publishDate: "asc" },
        });
        await db_1.db.$transaction(async (tx) => {
            if (featuredProjects.length >= 3) {
                await tx.project.update({
                    where: { id: featuredProjects[0].id },
                    data: { isFeatured: false },
                });
            }
            await tx.project.update({
                where: { id: projectId },
                data: { isFeatured: true },
            });
        });
        logger_1.default.info(meta, "Project featured");
        res.status(200).json({ message: "Project featured." });
    }
    catch (error) {
        logger_1.default.warn({ ...meta, error }, "Error toggling project featured");
        next(error);
    }
};
exports.toggleProjectFeatured = toggleProjectFeatured;
const toggleProjectPublished = async (req, res, next) => {
    const projectId = req.params.projectId;
    const userId = req.user.id;
    const isAdmin = req.user.role === "ADMIN";
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        projectId,
        userId,
    };
    try {
        logger_1.default.info(meta, "Toggling project published status");
        if (!isAdmin) {
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Must be admin to toggle published status.",
            });
        }
        const project = await db_1.db.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: "Project not found!",
            });
        }
        const newStatus = !project.isPublished;
        const shouldSetPublishDate = !project.isPublished && newStatus;
        await db_1.db.project.update({
            where: { id: projectId },
            data: {
                isPublished: newStatus,
                publishDate: shouldSetPublishDate ? new Date() : null,
            },
        });
        logger_1.default.info(meta, `Project ${newStatus ? "published" : "unpublished"}`);
        res.status(200).json({
            message: `Project successfully ${newStatus ? "published" : "unpublished"}.`,
        });
    }
    catch (error) {
        logger_1.default.warn({ ...meta, error }, "Error toggling published status");
        next(error);
    }
};
exports.toggleProjectPublished = toggleProjectPublished;
