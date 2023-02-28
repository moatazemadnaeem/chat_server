import {Request,Response,NextFunction} from 'express'
import {CustomError} from '../errorsclasses/customerr'
interface errorbase{
    errors:{
        message:string;
        field?:string;
    }[]
}
export const handelerr=(err:Error,req:Request,res:Response,next:NextFunction)=>{
    let transformed:{ message:string;field?:string;}[];
    let errtransformed:errorbase;
    if(err instanceof CustomError){
        transformed=err.summary()
        errtransformed={errors:transformed}
        return res.status(err.statusCode).send(errtransformed)
    }
    else{
        transformed=[{message:err.message}]
        errtransformed={errors:transformed}
        //bad request
        console.error(err)
        return res.status(400).send(errtransformed)
    }
   
}