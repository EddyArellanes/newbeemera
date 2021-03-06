import { Request, Response } from 'express';
import { BeemeraResponse, sendMessage} from '../utils/beemera-response';

export const response = (req:Request, res:Response) => {    
    const {error, code, data} = req;
    const response:BeemeraResponse = new BeemeraResponse(res, code , req.baseUrl, req.method, data , error || null);
    try{          
      response.printLog();
      return sendMessage(response);
      
    }catch(error){
      console.error(`response.ts`, error)
      return sendMessage(response);
    }
    
}