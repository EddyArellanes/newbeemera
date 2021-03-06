import serverless from 'serverless-http';
import app from "./app"

export const initServerless = async () => { 
  return serverless(app,  {
    request: async (req, event, context) => {            
      req.event = event;
      req.context = context;
      req.pathParams = event.pathParameters;
    }
  });  
}