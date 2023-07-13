import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    try {
      return fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
