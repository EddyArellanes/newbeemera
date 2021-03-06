import Joi, { Schema } from '@hapi/joi';
import { ValidationSchema } from '../../../interfaces';

export const paramsSchema:Schema = Joi.object().keys({    
});

export const querySchema:Schema = Joi.object().keys({    
});

export const bodySchema:Schema = Joi.object().keys({
    title: Joi.string().required().description('Name of your wallet').example('Bank Account'),
    description: Joi.string().required().description('Description of your wallet').example('Where my incomes arrive')
});

export const schemaUpsertWallet: ValidationSchema = {
  paramsSchema,
  querySchema,
  bodySchema
}