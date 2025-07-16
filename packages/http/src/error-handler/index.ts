import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../api-error';
import { logger } from '@marketly/logger';

export const errorMiddleware = (err: Error, req: Request, res: Response, _: NextFunction) => {
  const errorMsg = {
    method: req.method,
    url: req.url,
    body: req.body,
    params: req.params,
    query: req.query,
    error: err.message,
  };

  if (err instanceof ApiError) {
    logger.error(errorMsg, 'Api error');

    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: 'error',
      message: err.message,
      ...(err.details && { details: err.details }),
    });
    return;
  }

  logger.error(errorMsg, 'Internal server error');
  res.status(500).json({
    statusCode: 500,
    status: 'error',
    message: 'Internal server error',
  });
};
