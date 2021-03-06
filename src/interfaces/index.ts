import { Schema } from '@hapi/joi';

export interface ResponseSchema {
    error: string;
    data: any;    
}

export interface ValidationSchema {
    paramsSchema: Schema; 
    querySchema: Schema; 
    bodySchema:Schema
}