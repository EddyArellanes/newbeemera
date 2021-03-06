import { Request, Response, NextFunction } from 'express';
//import { getRepository } from "typeorm";
import { Wallet } from '../../../entities/Wallet';

export const handlerGetWallets = async ( req: Request, res: Response, next:NextFunction): Promise<Response> => {
  try{      
    // const data = await getRepository(Wallet).createQueryBuilder('wallet')
    //   .orderBy('title', 'ASC')
    //   .getMany();
  const data = {};
   res.json({data});

  }catch(error){
    console.error('getWallets', error);
    req.error = error;    
    next();
  }
};

export const getWalletById = async ( req: Request,res: Response, next:NextFunction): Promise<Response> => {
  try{
  console.info(req.query);
  console.info(req.params);
  if(!req.params.walletId) res.status(400).json({error: 'walletId is required'});
  // const data = await getRepository(Wallet).createQueryBuilder('wallet')
  //   .orderBy('title', 'ASC')
  //   .getMany();
    console.log({})
    return res.json({})

  }catch(error){      
     next();
  }
};