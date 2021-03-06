import * as Joi from '@hapi/joi';
import { Schema, ValidationError } from '@hapi/joi';

interface AnyObject {
  [key: string]: any;
}

/**
 * Validates input against the provided JOI schema
 * @param input (object)
 * @param schema (Schema)
 * @returns (Promise) Resolves input validation
 */
export const validate = async (input: AnyObject, schema: Schema): Promise<any> => {
  try{
    console.info('Validating....');
    const a = await Joi.validate(input, schema);
    console.info('Validated', a);
  }catch{

  }
};

export { Joi, ValidationError };