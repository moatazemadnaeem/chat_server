import {validationResult} from 'express-validator'
import { validateincomingreq } from '../errorsclasses/incomingreq'
import {Request,Response,NextFunction} from 'express'
export const validatereq=(req:Request,res:Response,next:NextFunction)=>{
    const error =validationResult(req)
    if(!error.isEmpty()){
        throw new validateincomingreq(error.array())
    }
    next()
}