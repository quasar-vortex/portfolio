"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleUserRoleHandler = exports.getUploadsByUserId = exports.deleteUserByIdHandler = exports.getManyUsersHandler = exports.getUserByIdHandler = exports.updateUserProfileHandler = exports.adminUserSelect = exports.baseUserSelect = void 0;
const db_1 = require("../db");
const error_1 = require("../error");
const logger_1 = __importDefault(require("../logger"));
const argon2_1 = __importDefault(require("argon2"));
const uploads_controller_1 = require("../uploads/uploads.controller");
const baseUserSelect = {
    id: true,
    firstName: true,
    lastName: true,
    bio: true,
    role: true,
    email: true,
    avatarFile: {
        select: {
            id: true,
            url: true,
        },
    },
};
exports.baseUserSelect = baseUserSelect;
const adminUserSelect = {
    ...baseUserSelect,
    isActive: true,
    lastLoginDate: true,
    registeredDate: true,
};
exports.adminUserSelect = adminUserSelect;
const updateUserProfileHandler = async (req, res, next) => {
    const isAdmin = req.user.role === "ADMIN";
    const toUpdateUserId = req.params.userId;
    const signedInUserId = req.user.id;
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId: signedInUserId,
        toUpdateId: toUpdateUserId,
    };
    try {
        logger_1.default.info(meta, "Request to update user");
        if (!isAdmin && signedInUserId !== toUpdateUserId)
            throw new error_1.HttpError({
                status: "FORBIDDEN",
                message: "Not allowed to update another's profile!",
            });
        const foundUser = await db_1.db.user.findUnique({
            where: { id: toUpdateUserId },
        });
        const { email, currentPassword, firstName, lastName, newPassword, bio, avatarFileId, } = req.body;
        const payload = {
            email,
            firstName,
            lastName,
            avatarFileId: avatarFileId ?? null,
            bio,
        };
        if (!foundUser)
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: "User was not found to update!",
            });
        if (email && foundUser.email !== email) {
            const existing = await db_1.db.user.findUnique({ where: { email } });
            if (existing)
                throw new error_1.HttpError({
                    status: "BAD_REQUEST",
                    message: `Email in use: ${email}`,
                });
            payload.email = email;
        }
        if (newPassword) {
            if (!currentPassword)
                throw new error_1.HttpError({
                    status: "BAD_REQUEST",
                    message: "Must include current password to update to a new one!",
                });
            if (newPassword === currentPassword)
                throw new error_1.HttpError({
                    status: "BAD_REQUEST",
                    message: "Old and new password may not match.",
                });
            const isPassValid = await argon2_1.default.verify(currentPassword, foundUser.passwordHash);
            if (!isPassValid)
                throw new error_1.HttpError({
                    status: "BAD_REQUEST",
                    message: "Incorrect password.",
                });
            payload.passwordHash = await argon2_1.default.hash(newPassword);
        }
        if (avatarFileId && avatarFileId !== foundUser.avatarFileId) {
            const foundFile = await db_1.db.file.findUnique({
                where: { id: avatarFileId },
            });
            if (!foundFile)
                throw new error_1.HttpError({
                    status: "BAD_REQUEST",
                    message: `Avatar file not found: ${avatarFileId}`,
                });
        }
        const updatedUser = await db_1.db.user.update({
            where: { id: toUpdateUserId },
            data: {
                ...payload,
                dateUpdated: new Date(),
                updatedById: signedInUserId,
            },
            select: baseUserSelect,
        });
        const message = "User was updated successfully";
        logger_1.default.info(meta, message);
        res.status(200).json({ data: updatedUser, message });
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to update user profile");
        next(error);
    }
};
exports.updateUserProfileHandler = updateUserProfileHandler;
const toggleUserRoleHandler = async (req, res, next) => {
    const isAdmin = req.user.role === "ADMIN";
    const toUpdateUserId = req.params.userId;
    const signedInUserId = req.user.id;
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId: signedInUserId,
        toUpdateId: toUpdateUserId,
    };
    try {
        logger_1.default.info(meta, "Request to toggle user role");
        if (signedInUserId === toUpdateUserId)
            throw new error_1.HttpError({
                status: "BAD_REQUEST",
                message: "Unable to disable own admin account.",
            });
        if (!isAdmin)
            throw new error_1.HttpError({
                status: "FORBIDDEN",
                message: "Only admins may change user roles!",
            });
        const user = await db_1.db.user.findUnique({
            where: { id: toUpdateUserId },
        });
        if (!user)
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: "User not found to update role!",
            });
        const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
        const updatedUser = await db_1.db.user.update({
            where: { id: toUpdateUserId },
            data: {
                role: newRole,
                dateUpdated: new Date(),
                updatedById: signedInUserId,
            },
            select: adminUserSelect,
        });
        logger_1.default.info(meta, `Updated user role to ${newRole}`);
        res.status(200).json({ data: updatedUser });
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to toggle user role");
        next(error);
    }
};
exports.toggleUserRoleHandler = toggleUserRoleHandler;
const getUserByIdHandler = async (req, res, next) => {
    const signedInUserId = req.user?.id;
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId: signedInUserId,
        toFindUserId: req.params.userId,
    };
    const isAdmin = req.user?.role === "ADMIN";
    try {
        logger_1.default.info(meta, "Request to find user");
        const where = { id: req.params.userId };
        if (!isAdmin)
            where.isActive = true;
        const foundUser = await db_1.db.user.findUnique({
            where,
            select: isAdmin ? adminUserSelect : { ...baseUserSelect, email: false },
        });
        if (!foundUser)
            throw new error_1.HttpError({
                status: "NOT_FOUND",
                message: "Unable to find user.",
            });
        logger_1.default.info(meta, "User was found");
        res
            .status(200)
            .json({ data: foundUser, message: "Found user successfully!" });
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to find user profile");
        next(error);
    }
};
exports.getUserByIdHandler = getUserByIdHandler;
const getManyUsersHandler = async (req, res, next) => {
    const signedInUserId = req.user?.id;
    const baseMeta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId: signedInUserId,
    };
    const isAdmin = req.user?.role === "ADMIN";
    try {
        if (!isAdmin)
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Only an admin may search users!",
            });
        const { pageIndex = "1", pageSize = "10", term, } = req.query;
        const trimmedTerm = term?.trim();
        const index = Math.max((parseInt(pageIndex, 10) || 1) - 1, 0);
        const size = Math.min(Math.max(parseInt(pageSize, 10) || 10, 1), 50);
        const where = {
            OR: [
                { firstName: { contains: term } },
                { lastName: { contains: term } },
                { email: { contains: term } },
            ],
        };
        const foundUsers = await db_1.db.user.findMany({
            where,
            select: adminUserSelect,
            take: size,
            skip: index * size,
        });
        const totalCount = await db_1.db.user.count({
            where,
        });
        const totalPages = Math.max(1, Math.ceil(totalCount / size));
        const meta = {
            pageIndex: index + 1,
            pageSize: size,
            totalPages,
            totalCount,
        };
        logger_1.default.info({ ...baseMeta, ...meta }, "Users found successfully!");
        res.status(200).json({
            message: "Users found successfully!",
            data: foundUsers,
            meta,
        });
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to find users.");
        next(error);
    }
};
exports.getManyUsersHandler = getManyUsersHandler;
const deleteUserByIdHandler = async (req, res, next) => {
    const toDeleteId = req.params.userId;
    const signedInUserId = req.user?.id;
    const meta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        userId: signedInUserId,
        toDeleteId,
    };
    const isAdmin = req.user?.role === "ADMIN";
    try {
        logger_1.default.info(meta, "Deactivating user.");
        if (!isAdmin)
            throw new error_1.HttpError({
                status: "NOT_AUTHORIZED",
                message: "Must be an admin to delete a user!",
            });
        await db_1.db.$transaction(async (tx) => {
            // deactivate db files
            await tx.file.updateMany({
                where: { userId: toDeleteId },
                data: {
                    isActive: false,
                    updatedById: signedInUserId,
                    dateUpdated: new Date().toISOString(),
                },
            });
            // deactivate projects
            await tx.project.updateMany({
                where: { authorId: toDeleteId },
                data: {
                    isActive: false,
                    isFeatured: false,
                    isPublished: false,
                    updatedById: signedInUserId,
                    updatedDate: new Date().toISOString(),
                },
            });
            // deactivate posts
            await tx.post.updateMany({
                where: { authorId: toDeleteId },
                data: {
                    isActive: false,
                    isFeatured: false,
                    isPublished: false,
                    updatedById: signedInUserId,
                    updatedDate: new Date().toISOString(),
                },
            });
            // deactivate user
            await tx.user.update({
                where: { id: toDeleteId },
                data: {
                    isActive: false,
                    updatedById: signedInUserId,
                    dateUpdated: new Date().toISOString(),
                },
            });
        });
        const user = await db_1.db.user.findUnique({
            where: { id: toDeleteId },
            select: adminUserSelect,
        });
        logger_1.default.info(meta, "User deactivated.");
        res.status(200).json({ data: user, message: "User was deactivated" });
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to find users.");
        next(error);
    }
};
exports.deleteUserByIdHandler = deleteUserByIdHandler;
const getUploadsByUserId = async (req, res, next) => {
    const signedInUserId = req.user.id;
    const userId = req.params.userId;
    const baseMeta = {
        ip: req.ip,
        method: req.method,
        url: req.url,
        searchedUserId: userId,
    };
    try {
        if (signedInUserId !== userId)
            throw new error_1.HttpError({
                status: "FORBIDDEN",
                message: "May only access your own files.",
            });
        const { name, pageIndex = "0", pageSize = "10", sortKey, sortOrder, } = req.query;
        const trimmedTerm = name?.trim();
        const index = Math.max((parseInt(pageIndex, 10) || 1) - 1, 0);
        const size = Math.min(Math.max(parseInt(pageSize, 10) || 10, 1), 50);
        const where = { userId };
        if (trimmedTerm)
            where.originalName = { contains: trimmedTerm };
        const select = uploads_controller_1.userFileSelect;
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
exports.getUploadsByUserId = getUploadsByUserId;
