"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const postController = __importStar(require("./posts.controller"));
const validation_middleware_1 = require("../middleware/validation.middleware");
const post_models_1 = require("./post.models");
const auth_middleware_1 = require("../middleware/auth.middleware");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter
    .post("/", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)("ADMIN"), (0, validation_middleware_1.valMiddleware)(post_models_1.createPostModel), postController.createPostHandler)
    .patch("/:postId/feature", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)("ADMIN"), postController.togglePostFeatured)
    .patch("/:postId/publish", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)("ADMIN"), postController.togglePostPublished)
    .put("/:postId", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)("ADMIN"), (0, validation_middleware_1.valMiddleware)(post_models_1.updatePostModel), postController.updatePostHandler)
    .get("/", (0, validation_middleware_1.valMiddleware)(post_models_1.searchPostsModel), auth_middleware_1.optionalAuthMiddleware, postController.getManyPostsHandler)
    .get("/:postId", auth_middleware_1.authMiddleware, postController.getPostByIdHandler)
    .get("/slug/:slug", auth_middleware_1.optionalAuthMiddleware, postController.getPostBySlugHandler)
    .delete("/:postId", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)("ADMIN"), postController.deletePostHandler);
