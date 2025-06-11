import { NextFunction, Request, Response } from "express";
import { ApiError } from "../api-error";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof ApiError) {
    console.log(`Error ${req.method} ${req.path}:: ${err.message}`);

    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: "error",
      message: err.message,
      ...(err.details && { details: err.details }),
    });
  }

  console.log(`Uncaught error ${req.method} ${req.path}:: ${err.message}`);
  res.status(500).json({
    statusCode: 500,
    status: "error",
    message: err.message,
  });
};
