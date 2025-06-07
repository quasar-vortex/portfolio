"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchTagsModel = exports.updateTagModel = exports.createTagModel = void 0;
const zod_1 = __importDefault(require("zod"));
const createTagModel = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .string()
            .min(2, { message: "Tag name must be greater than 2 characters." })
            .max(50, { message: "Tag name cannot exceed 50 characters." }),
    }),
});
exports.createTagModel = createTagModel;
const updateTagModel = zod_1.default.object({
    params: zod_1.default.object({
        tagId: zod_1.default.string().max(36, { message: "UUID Doesn't Exceed 36 Characters" }),
    }),
    body: zod_1.default.object({
        name: zod_1.default
            .string()
            .min(2, { message: "Tag name must be greater than 2 characters." })
            .max(50, { message: "Tag name cannot exceed 50 characters." }),
    }),
});
exports.updateTagModel = updateTagModel;
const searchTagsModel = zod_1.default.object({
    query: zod_1.default.object({
        term: zod_1.default
            .string()
            .max(50, { message: "Search cannot exceed 50 characters." })
            .optional(),
        pageIndex: zod_1.default.string().optional(),
        pageSize: zod_1.default.string().optional(),
    }),
});
exports.searchTagsModel = searchTagsModel;
