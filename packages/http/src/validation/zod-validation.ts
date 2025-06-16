import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../api-error';
import z from 'zod';

import { logger } from '@marketly/logger';

export function zodValidation<T extends z.ZodTypeAny>(
  schema: T,
  dataForValidation: unknown,
): z.infer<T> {
  if (!dataForValidation) {
    logger.error('Schema not found', 'Zod validation error');
    throw new ValidationError('All fields are required');
  }
  const result = schema.safeParse(dataForValidation);
  if (!result.success) {
    logger.error(result.error.errors, 'Zod validation error');
    throw new ValidationError(result.error.errors[0].message);
  }
  return result.data;
}

export function zodValidationMiddleware<T>(schema: z.ZodSchema<T>) {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      zodValidation(schema, req.body);
      next();
    } catch (error: any) {
      next(new ValidationError(error.message));
    }
  };
}

export function zodValidationQueryMiddleware<T>(schema: z.ZodSchema<T>) {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      zodValidation(schema, req.query);
      next();
    } catch (error: any) {
      next(new ValidationError(error.message));
    }
  };
}

/**
 * Zod validation from schemas
 */
export function zodValidationFromSchemas<Schema extends Record<string, z.ZodSchema>>(
  schemas: Schema,
  validateType: keyof Schema,
  data: unknown,
): z.infer<Schema[typeof validateType]> {
  const schema = schemas[validateType];
  if (!schema) throw new ValidationError('Validation failed');

  return zodValidation(schema, data);
}
