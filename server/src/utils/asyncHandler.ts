import { RequestHandler } from "express";
import { CustomRequestHandler } from "../types";

export type AsyncHandler = (fn: CustomRequestHandler) => CustomRequestHandler;

const asyncHandler: AsyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
