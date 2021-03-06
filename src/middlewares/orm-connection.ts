import { Request, Response, NextFunction } from 'express';
import {initConnection} from '../utils/typeorm-connection';

export const ormConnection = async (req:Request, res:Response, next:NextFunction)  => {
    await initConnection();
    console.info('PostgresDB Connected ✅')
    next();
}