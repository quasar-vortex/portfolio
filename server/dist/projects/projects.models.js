"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProjectsModel = exports.updateProjectModel = exports.createProjectModel = void 0;
const zod_1 = __importDefault(require("zod"));
const createProjectModel = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string(),
        description: zod_1.default.string().max(500),
        content: zod_1.default
            .string()
            .min(10, "Content must be at least 10 characters")
            .max(100000, "Content must be less than 100,000 characters"),
        coverImageId: zod_1.default.string().optional(),
        isPublished: zod_1.default.boolean(),
        isFeatured: zod_1.default.boolean(),
        tags: zod_1.default.array(zod_1.default.string()),
        codeUrl: zod_1.default.string().optional(),
        liveUrl: zod_1.default.string().optional(),
    }),
});
exports.createProjectModel = createProjectModel;
const updateProjectModel = zod_1.default.object({
    params: zod_1.default.object({ projectId: zod_1.default.string() }),
    body: createProjectModel.shape.body.pick({
        title: true,
        description: true,
        coverImageId: true,
        isFeatured: true,
        isPublished: true,
        tags: true,
        content: true,
        codeUrl: true,
        liveUrl: true,
    }),
});
exports.updateProjectModel = updateProjectModel;
const searchProjectsModel = zod_1.default.object({
    query: zod_1.default.object({
        term: zod_1.default.string().optional(),
        pageIndex: zod_1.default.string().optional(),
        pageSize: zod_1.default.string().optional(),
        tags: zod_1.default.string().optional(),
        // query is string unlike body which is boolean
        isFeatured: zod_1.default.union([zod_1.default.literal("false"), zod_1.default.literal("true")]).optional(),
        sortOrder: zod_1.default.union([zod_1.default.literal("asc"), zod_1.default.literal("desc")]).optional(),
        sortKey: zod_1.default.union([zod_1.default.literal("publishDate"), zod_1.default.literal("title")]).optional(),
    }),
});
exports.searchProjectsModel = searchProjectsModel;
