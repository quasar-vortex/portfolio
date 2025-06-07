"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const validation_middleware_1 = require("../middleware/validation.middleware");
const auth_models_1 = require("./auth.models");
const auth_middleware_1 = require("../middleware/auth.middleware");
const auth_controller_1 = require("./auth.controller");
exports.authRouter = (0, express_1.Router)();
exports.authRouter
    .post("/register", (0, validation_middleware_1.valMiddleware)(auth_models_1.registerUserModel), auth_controller_1.registerUserHandler)
    .post("/login", (0, validation_middleware_1.valMiddleware)(auth_models_1.loginUserModel), auth_controller_1.loginUserHandler)
    .get("/refresh", auth_controller_1.refreshUserHandler)
    .get("/logoff", auth_middleware_1.authMiddleware, auth_controller_1.signOutUserHandler);
