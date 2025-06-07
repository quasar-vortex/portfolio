"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyFilesHandler = exports.getFileByIdHandler = exports.deleteFileByIdHandler = exports.uploadFileHandler = exports.adminFileSelect = exports.userFileSelect = void 0;
const db_1 = require("../db");
const error_1 = require("../error");
const logger_1 = __importDefault(require("../logger"));
const upload_1 = require("../upload");
exports.userFileSelect = {
    id: true,
    url: true,
    fileType: true,
    dateUploaded: true,
    dateUpdated: true,
    originalName: true,
    userId: true,
};
exports.adminFileSelect = {
    ...exports.userFileSelect,
    isActive: true,
    originalName: true,
    size: true,
    userId: true,
};
const uploadFileHandler = async (req, res, next) => {
    const userId = req.user.id;
    const file = req.file;
    const role = req.user.role;
    const isAdmin = role == "ADMIN";
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId,
    };
    logger_1.default.info(meta, "Uploading File!");
    let fileKey = null;
    try {
        if (!file) {
            throw new error_1.HttpError({
                status: "BAD_REQUEST",
                message: "Must include a file to upload.",
            });
        }
        const { key, location, size, originalname, mimetype } = file;
        fileKey = key;
        const dbFile = await db_1.db.file.create({
            data: {
                objectKey: key,
                url: location,
                size,
                originalName: originalname,
                fileType: "IMAGE",
                userId,
            },
            select: isAdmin ? exports.adminFileSelect : exports.userFileSelect,
        });
        const message = "File has been uploaded";
        logger_1.default.info({ ...meta, fileId: dbFile.id }, message);
        res.status(201).json({ data: dbFile, message });
    }
    catch (error) {
        if (fileKey)
            await (0, upload_1.deleteFileByKey)(fileKey);
        logger_1.default.warn({ error }, "Could not upload file");
        next(error);
    }
};
exports.uploadFileHandler = uploadFileHandler;
const deleteFileByIdHandler = async (req, res, next) => {
    const fileId = req.params.fileId;
    const userId = req.user.id;
    const role = req.user.role;
    const isAdmin = role == "ADMIN";
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId,
    };
    logger_1.default.info(meta, "Deleting File!");
    try {
        const foundFile = await db_1.db.file.findUnique({ where: { id: fileId } });
        if (!foundFile) {
            res.status(200).json({ message: "File has been deleted." });
            return;
        }
        if (!isAdmin)
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Must be an admin to delete a file.",
            });
        await db_1.db.file.update({
            where: { id: fileId },
            data: { isActive: false, updatedById: userId },
        });
        logger_1.default.info(meta, "File was deleted.");
        res.status(200).json({ message: "File was deleted!" });
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to delete file");
        next(error);
    }
};
exports.deleteFileByIdHandler = deleteFileByIdHandler;
const getFileByIdHandler = async (req, res, next) => {
    const fileId = req.params.fileId;
    const userId = req.user.id;
    const role = req.user.role;
    const isAdmin = role == "ADMIN";
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId,
    };
    logger_1.default.info(meta, "Finding File!");
    try {
        const where = { id: fileId };
        if (!isAdmin)
            where.isActive = true;
        const foundFile = await db_1.db.file.findUnique({
            where,
            select: isAdmin ? exports.adminFileSelect : exports.userFileSelect,
        });
        if (!foundFile)
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: "File could not be find!",
            });
        logger_1.default.info(meta, "File was found");
        res
            .status(200)
            .json({ data: foundFile, message: "Found file successfully!" });
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to retrieve file");
        next(error);
    }
};
exports.getFileByIdHandler = getFileByIdHandler;
const getManyFilesHandler = async (req, res, next) => {
    const userId = req.user.id;
    const role = req.user.role;
    const isAdmin = role == "ADMIN";
    const baseMeta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId,
    };
    try {
        const { name, pageIndex = "0", pageSize = "10", sortKey, sortOrder, } = req.query;
        const trimmedTerm = name?.trim();
        const index = Math.max((parseInt(pageIndex, 10) || 1) - 1, 0);
        const size = Math.min(Math.max(parseInt(pageSize, 10) || 10, 1), 50);
        const where = {};
        if (trimmedTerm)
            where.originalName = { contains: trimmedTerm };
        if (!isAdmin)
            where.isActive = true;
        const select = isAdmin ? exports.adminFileSelect : exports.userFileSelect;
        const totalCount = await db_1.db.file.count({
            where,
        });
        const foundFiles = await db_1.db.file.findMany({
            where,
            select,
            take: size,
            skip: index * size,
            // if sortkey and sortorder pased then check
            ...(sortKey &&
                sortOrder && {
                orderBy: {
                    [sortKey === "name" ? "originalName" : sortKey]: sortOrder,
                },
            }),
        });
        const totalPages = Math.max(1, Math.ceil(totalCount / size));
        const meta = {
            pageIndex: index + 1,
            pageSize: size,
            totalPages,
            totalCount,
        };
        logger_1.default.info({ ...baseMeta, ...meta }, "Files found!");
        res.status(200).json({
            message: "Files found successfully!",
            data: foundFiles,
            meta,
        });
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to retrieve files");
        next(error);
    }
};
exports.getManyFilesHandler = getManyFilesHandler;
