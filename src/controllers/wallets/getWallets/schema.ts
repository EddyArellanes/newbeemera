import Joi, { Schema } from '@hapi/joi';
import { ValidationSchema } from '../../../interfaces';

export const paramsSchema:Schema = Joi.object().keys({    
});

export const querySchema:Schema = Joi.object().keys({  
    walletId: Joi.string().required().description('filter by ID').example(1)  
});

export const bodySchema:Schema = Joi.object().keys({
   
});

export const schemaGetWallets: ValidationSchema = {
  paramsSchema,
  querySchema,
  bodySchema
}