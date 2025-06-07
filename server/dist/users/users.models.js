"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsersModel = exports.updateUserModel = exports.updateUserRole = void 0;
const zod_1 = __importDefault(require("zod"));
const auth_1 = require("../auth");
const updateUserRole = zod_1.default.object({
    params: zod_1.default.object({ userId: zod_1.default.string() }),
    body: zod_1.default.object({
        role: zod_1.default.union([zod_1.default.literal("ADMIN"), zod_1.default.literal("USER")]).optional(),
    }),
});
exports.updateUserRole = updateUserRole;
const updateUserModel = zod_1.default.object({
    params: zod_1.default.object({ userId: zod_1.default.string() }),
    body: zod_1.default.object({
        firstName: auth_1.baseUseModel.shape.firstName,
        lastName: auth_1.baseUseModel.shape.lastName,
        email: auth_1.baseUseModel.shape.email,
        bio: zod_1.default
            .string()
            .max(250, { message: "Bio cannot exceeed 250 characters." })
            .optional(),
        avatarFileId: zod_1.default
            .string()
            .max(250, { message: "Bio cannot exceeed 250 characters." })
            .optional(),
        currentPassword: auth_1.baseUseModel.shape.password.optional(),
        newPassword: auth_1.baseUseModel.shape.password.optional(),
    }),
});
exports.updateUserModel = updateUserModel;
const searchUsersModel = zod_1.default.object({
    query: zod_1.default.object({
        pageIndex: zod_1.default.string(),
        pageSize: zod_1.default.string(),
        term: zod_1.default.string().max(100).optional(),
    }),
});
exports.searchUsersModel = searchUsersModel;
