import { RequestHandler } from "express";

export type AsyncHandler = (fn: RequestHandler) => RequestHandler;

export const asyncHandler: AsyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
