"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFilesModel = void 0;
const zod_1 = __importDefault(require("zod"));
const searchFilesModel = zod_1.default.object({
    query: zod_1.default.object({
        name: zod_1.default
            .string()
            .max(100, { message: "Search cannot exceed 100 characters." })
            .optional(),
        pageIndex: zod_1.default.string().optional(),
        pageSize: zod_1.default.string().optional(),
        sortOrder: zod_1.default.union([zod_1.default.literal("asc"), zod_1.default.literal("desc")]).optional(),
        sortKey: zod_1.default.union([zod_1.default.literal("dateUploaded"), zod_1.default.literal("name")]).optional(),
    }),
});
exports.searchFilesModel = searchFilesModel;
