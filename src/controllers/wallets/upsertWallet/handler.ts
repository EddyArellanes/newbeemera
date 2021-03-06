import {Request, Response, NextFunction} from 'express';
import {getRepository} from "typeorm";
import {Wallet} from '../../../entities/Wallet';
import {ResponseSchema} from '../../../interfaces';
export const handlerUpsertWallet = async ( req: Request, res: Response, next:NextFunction): Promise<Response> => {
  try{          
    const result:ResponseSchema = {
      error: '',
      data: {},
    }
    const data = await getRepository(Wallet).save(req.body);
    res.status(200).json(result);

  }catch(error){ 
    req.error = error;    
    next();
  }
};