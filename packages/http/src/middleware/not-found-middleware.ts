import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../api-error';

export const notFoundMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  return next(new NotFoundError('Route not found'));
};
