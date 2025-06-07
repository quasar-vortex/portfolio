"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPostsModel = exports.updatePostModel = exports.createPostModel = void 0;
const zod_1 = __importDefault(require("zod"));
const basePostModel = zod_1.default.object({
    title: zod_1.default.string(),
    excerpt: zod_1.default.string(),
    content: zod_1.default
        .string()
        .min(10, "Content must be at least 10 characters")
        .max(100000, "Content must be less than 100,000 characters"),
    tags: zod_1.default.array(zod_1.default.string()),
    isPublished: zod_1.default.boolean().optional(),
    isFeatured: zod_1.default.boolean().optional(),
    coverImageId: zod_1.default.string().optional(),
    isActive: zod_1.default.boolean().optional(),
});
const createPostModel = zod_1.default.object({
    body: basePostModel.pick({
        title: true,
        excerpt: true,
        content: true,
        tags: true,
        isPublished: true,
        isFeatured: true,
        coverImageId: true,
    }),
});
exports.createPostModel = createPostModel;
const updatePostModel = zod_1.default.object({
    params: zod_1.default.object({ postId: zod_1.default.string() }),
    body: basePostModel.pick({
        title: true,
        excerpt: true,
        content: true,
        tags: true,
        isPublished: true,
        isFeatured: true,
        coverImageId: true,
    }),
});
exports.updatePostModel = updatePostModel;
const searchPostsModel = zod_1.default.object({
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
exports.searchPostsModel = searchPostsModel;
