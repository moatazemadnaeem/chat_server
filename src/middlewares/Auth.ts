import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {NotAuth} from '../errorsclasses/notAuth'
import {IsValidUser} from '../utils/isValid'
interface userPayload{
    id:string;
    email:string;
}
declare global{
    namespace Express{
        interface Request{
            currentUser?:userPayload;
        }
    }
}
export const Auth=async(req:Request,res:Response,next:NextFunction)=>{
   
    if(req.headers.authentication||req.body.authentication){
        try{
            const authentication=req.headers.authentication?req.headers.authentication:req.body.authentication
            const payload= jwt.verify(authentication,process.env.JWT_KEY!) as userPayload
            req.currentUser=payload
            const validated= await IsValidUser(payload)
            if(!validated){
              return next(new NotAuth('Please check your email to validate')) 
            }
          }catch(err){
            return next(new NotAuth('You are not authenticated')) 
          }
         
        return next()
    }
    if(!req.session?.jwt){
       return next(new NotAuth('You are not authenticated')) 
    }
    try{
          const payload= jwt.verify(req.session.jwt,process.env.JWT_KEY!) as userPayload
          req.currentUser=payload
          const validated=await IsValidUser(payload)
          if(!validated){
            return next(new NotAuth('Please check your email to validate')) 
          }
    }catch(err){
       return next(new NotAuth('You are not authenticated')) 
    }
    
  return next()
    
}