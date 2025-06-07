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
exports.usersRouter = void 0;
const express_1 = require("express");
const validation_middleware_1 = require("../middleware/validation.middleware");
const users_models_1 = require("./users.models");
const auth_middleware_1 = require("../middleware/auth.middleware");
const usersController = __importStar(require("./users.controller"));
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter
    .put("/:userId/role", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)("ADMIN"), (0, validation_middleware_1.valMiddleware)(users_models_1.updateUserRole), usersController.toggleUserRoleHandler)
    .put("/:userId", auth_middleware_1.authMiddleware, (0, validation_middleware_1.valMiddleware)(users_models_1.updateUserModel), usersController.updateUserProfileHandler)
    .get("/:userId", usersController.getUserByIdHandler)
    .get("/:userId/uploads", auth_middleware_1.authMiddleware, usersController.getUploadsByUserId)
    .get("/", auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)("ADMIN"), usersController.getManyUsersHandler)
    .delete("/:userId", usersController.deleteUserByIdHandler);
