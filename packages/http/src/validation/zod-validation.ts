import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../api-error';
import z from 'zod';

export function zodValidation<T extends z.ZodTypeAny>(
  schema: T,
  dataForValidation: unknown,
): z.infer<T> {
  if (!dataForValidation) {
    throw new Error('All fields are required');
  }
  const result = schema.safeParse(dataForValidation);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
}

export function zodValidationMiddleware<T>(schema: z.ZodSchema<T>) {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      console.log('zodValidationMiddleware', req.body);
      req.body = zodValidation(schema, req.body);
      next();
    } catch (error: any) {
      console.log(error);
      next(new ValidationError(error.message));
    }
  };
}
