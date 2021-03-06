import { Response } from 'express';

export interface DataResponse{
  status: string,
  data: any,
  error: string | null
}
export class BeemeraResponse {
  code: number
  status: string
  url: string
  method: string
  data: any
  error: string
  res: any
    

  constructor( res: Response, code: number, url: string, method: string, data: any , error ?: string){
      this.code = code
      this.status = this.getCodeError( code, method);
      this.url = url
      this.method = method
      this.data = data
      this.error = error
      this.res = res         
  }
  printLog(){
    console.info(`Logging ${ this.url}`, this.code, this.method, this.data);
  }
  getCodeError( status:number, method?:string){
    switch ( status) {
      case 200:
        return 'OK'
      case 201:
        const text = (method == 'POST' ) ? 'Created' : (method == 'PUT' ) ? 'Updated' : ' Deleted';  
        return `Resource ${text} Successfully`;
      case 204:
        return "Request processed succesfully but any content to show"
      case 303:
          return "Recources already has been created"        
      case 400:
        return "Bad request, be sure that data you're sending is valid"  
      case 401:
          return "Unathorized"
      case 403:
          return 'Forbbiden';
      case 404:
        return "Resource does not exist"       
      case 500:
        return "Server not available, please retry later..."                             
      default:
        return "Unknown system behavior please report to an administrator"        
    }
  }
}

export const sendMessage = (response:BeemeraResponse) => {
  try{
    const body:DataResponse = {
      status: response.status,
      data: response.data,
      error: response.error
    } 

    response.res.setHeader( 'Content-Type', 'application/json')
    return response.res.status( response.code ).json( body)
    
  }catch( error){
    console.log("Error on Response.ts/sendMessage:", error)
    return response.res.status( response.status).json( "Unavailable please try again later")
  }
}