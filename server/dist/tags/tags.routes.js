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
exports.tagsRouter = void 0;
const express_1 = require("express");
const tagsController = __importStar(require("./tags.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const tags_models_1 = require("./tags.models");
/*
GET / Get all tags with search by tag name - PUBLIC Access
POST / Create a new tag - ADMIN Access
PUT /:tagId Update a tag name - ADMIN Access
GET /:tagId - PUBLIC Access
GET /name/:tagName PUBLIC Access
DELETE /:tagID - ADMIN Access
*/
exports.tagsRouter = (0, express_1.Router)();
exports.tagsRouter
    .get("/name/:tagName", auth_middleware_1.optionalAuthMiddleware, tagsController.getTagByNameHandler)
    .get("/:tagId", auth_middleware_1.optionalAuthMiddleware, tagsController.getTagByIdHandler)
    .get("/", tagsController.searchTagsHandler)
    .post("/", auth_middleware_1.authMiddleware, (0, validation_middleware_1.valMiddleware)(tags_models_1.createTagModel), tagsController.createNewTagHandler)
    .patch("/:tagId", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)("ADMIN"), (0, validation_middleware_1.valMiddleware)(tags_models_1.updateTagModel), tagsController.updateTagByIdHandler)
    .delete("/:tagId", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)("ADMIN"), tagsController.deleteTagByIdHandler);
