"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTagByIdHandler = exports.getTagByNameHandler = exports.getTagByIdHandler = exports.updateTagByIdHandler = exports.searchTagsHandler = exports.createNewTagHandler = void 0;
const logger_1 = __importDefault(require("../logger"));
const db_1 = require("../db");
const error_1 = require("../error");
const baseSelect = {
    id: true,
    name: true,
};
const adminSelect = { ...baseSelect };
const createNewTagHandler = async (req, res, next) => {
    const signedInId = req.user.id;
    const role = req.user.role;
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId: signedInId,
    };
    try {
        logger_1.default.info({ ...meta }, "Creating new tag.");
        if (role !== "ADMIN") {
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Must be an admin to make a tag.",
            });
        }
        const { name } = req.body;
        const existingTag = await db_1.db.tag.findUnique({ where: { name } });
        if (existingTag) {
            throw new error_1.HttpError({
                status: "BAD_REQUEST",
                message: "Tag name in use.",
            });
        }
        const newTag = await db_1.db.tag.create({
            data: { name },
        });
        logger_1.default.info({ ...meta }, "New Tag Created");
        res.status(201).json({ data: newTag, message: "Tag Created Successfully" });
    }
    catch (error) {
        logger_1.default.warn({ error: error instanceof Error ? error.message : error }, "Tag creation failed");
        return next(error);
    }
};
exports.createNewTagHandler = createNewTagHandler;
const searchTagsHandler = async (req, res, next) => {
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
    };
    try {
        const role = req.user?.role;
        const { term = "", pageIndex = "1", pageSize = "10", } = req.query;
        const trimmedTerm = term && term !== "" && term.trim();
        const index = Math.max((parseInt(pageIndex, 10) || 1) - 1, 0);
        const size = Math.min(Math.max(parseInt(pageSize, 10) || 10, 1), 50);
        logger_1.default.info({ ...meta, term: trimmedTerm, pageIndex: index + 1, pageSize: size }, "Searching for tags.");
        const where = {};
        if (trimmedTerm)
            where.name = { contains: trimmedTerm };
        const count = await db_1.db.tag.count({ where });
        const foundTags = await db_1.db.tag.findMany({
            where,
            take: size,
            skip: index * size,
            select: role === "ADMIN" ? adminSelect : baseSelect,
            orderBy: { name: "desc" },
        });
        logger_1.default.info({
            ...meta,
            pageIndex: index + 1,
            pageSize: size,
            totalPages: Math.max(1, Math.ceil(count / size)),
            totalCount: count,
        }, "Tags Successfully Found");
        setTimeout(() => {
            res.status(200).json({
                message: "Tags found successfully!",
                data: foundTags,
                meta: {
                    pageSize: size,
                    pageIndex: index + 1,
                    totalPages: Math.max(1, Math.ceil(count / size)),
                    totalCount: count,
                },
            });
        }, 3000);
    }
    catch (error) {
        logger_1.default.warn({ ...meta, error: error instanceof Error ? error.message : error }, "Unable to retrieve tags.");
        return next(error);
    }
};
exports.searchTagsHandler = searchTagsHandler;
const updateTagByIdHandler = async (req, res, next) => {
    const tagId = req.params.tagId;
    const signedInId = req.user.id;
    const role = req.user.role;
    const isAdmin = role === "ADMIN";
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        tagId,
        userId: signedInId,
    };
    logger_1.default.info(meta, "Updating tag.");
    try {
        if (!isAdmin) {
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Must be an admin to update a tag.",
            });
        }
        const { name } = req.body;
        const foundTag = await db_1.db.tag.findUnique({ where: { id: tagId } });
        if (!foundTag)
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: "TAG NOT FOUND!",
            });
        if (name !== foundTag.name) {
            const nameInUse = await db_1.db.tag.findUnique({ where: { name } });
            if (nameInUse) {
                throw new error_1.HttpError({
                    status: "BAD_REQUEST",
                    message: `Tag name ${name} is in use.`,
                });
            }
        }
        const updatedTag = await db_1.db.tag.update({
            where: { id: tagId },
            data: { name },
            select: {
                id: true,
                name: true,
            },
        });
        logger_1.default.info(meta, "Tag updated successfully.");
        res
            .status(200)
            .json({ message: "Tag updated successfully!", data: updatedTag });
    }
    catch (error) {
        logger_1.default.warn({ error: error instanceof Error ? error.message : error }, "Unable to update tag.");
        return next(error);
    }
};
exports.updateTagByIdHandler = updateTagByIdHandler;
const getTagByIdHandler = async (req, res, next) => {
    const tagId = req.params.tagId;
    const isAdmin = req.user?.role === "ADMIN";
    const meta = { ip: req.ip, method: req.method, url: req.url, tagId };
    logger_1.default.info(meta, "Request to get tag by Id.");
    try {
        const where = { id: tagId };
        const foundTag = await db_1.db.tag.findUnique({
            where,
            select: isAdmin ? adminSelect : baseSelect,
        });
        if (!foundTag) {
            logger_1.default.warn(meta, "Tag was not found");
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: `Tag with ${tagId} was not found!`,
            });
        }
        logger_1.default.info(meta, "Tag was found!");
        res.status(200).json({ data: foundTag });
    }
    catch (error) {
        logger_1.default.warn({ error: error instanceof Error ? error.message : error }, "Unable to get tag.");
        return next(error);
    }
};
exports.getTagByIdHandler = getTagByIdHandler;
const getTagByNameHandler = async (req, res, next) => {
    const tagName = req.params.tagName;
    const isAdmin = req.user?.role === "ADMIN";
    const meta = { ip: req.ip, method: req.method, url: req.url, tagName };
    logger_1.default.info(meta, "Request to get tag by name.");
    try {
        const where = { name: tagName };
        const foundTag = await db_1.db.tag.findUnique({
            where,
            select: {
                id: true,
                name: true,
            },
        });
        if (!foundTag) {
            logger_1.default.warn(meta, "Tag was not found");
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: `Tag with ${tagName} was not found!`,
            });
        }
        logger_1.default.info(meta, "Tag was found!");
        res.status(200).json({ data: foundTag });
    }
    catch (error) {
        logger_1.default.warn({ error: error instanceof Error ? error.message : error }, "Unable to get tag.");
        return next(error);
    }
};
exports.getTagByNameHandler = getTagByNameHandler;
const deleteTagByIdHandler = async (req, res, next) => {
    const tagId = req.params.tagId;
    const isAdmin = req.user.role === "ADMIN";
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        tagId,
        userId: req.user.id,
    };
    logger_1.default.info(meta, "Request to delete tag by Id.");
    try {
        if (!isAdmin) {
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Must be admin to delete tag.",
            });
        }
        const foundTag = await db_1.db.tag.findUnique({ where: { id: tagId } });
        if (!foundTag) {
            logger_1.default.warn(meta, "Tag was not found");
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: `Tag with ${tagId} was not found!`,
            });
        }
        await db_1.db.tag.delete({ where: { id: tagId } });
        logger_1.default.info(meta, "Tag was deactivated (soft deleted).");
        res.status(200).json({ data: foundTag });
    }
    catch (error) {
        logger_1.default.warn({ error: error instanceof Error ? error.message : error }, "Unable to delete tag.");
        return next(error);
    }
};
exports.deleteTagByIdHandler = deleteTagByIdHandler;
