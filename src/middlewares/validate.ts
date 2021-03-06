import { Request, RequestHandler, Response, NextFunction } from 'express';
import { ValidationSchema, ResponseSchema } from '../interfaces';

export const validate = (schema: ValidationSchema) => {  
  return (req: Request, res:Response, next: NextFunction): RequestHandler => {
    const errorResponse: ResponseSchema = {
      error: '',
      data: {},
    }
    const paramsValidation = schema.paramsSchema.validate(req.params);
    const queryValidation = schema.querySchema.validate(req.query);
    const bodyValidation = schema.bodySchema.validate(req.body);

    if (paramsValidation.error) {
      errorResponse.error = paramsValidation.error.message;
      res.status(400).json(errorResponse);
    }
    if (queryValidation.error) {
      errorResponse.error = queryValidation.error.message;
      res.status(400).json(errorResponse);
    }
    if (bodyValidation.error) {
      errorResponse.error = bodyValidation.error.message;
      res.status(400).json(errorResponse);
    }
    
    next();
  }       
};
  