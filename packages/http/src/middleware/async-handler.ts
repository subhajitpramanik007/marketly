import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler =
  (
    fun: (req: Request, res: Response, next: NextFunction) => Promise<void>
  ): RequestHandler =>
  (req, res, next) => {
    return Promise.resolve(fun(req, res, next)).catch(next);
  };
