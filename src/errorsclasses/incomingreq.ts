import {ValidationError} from 'express-validator'
import { CustomError } from './customerr'
export class validateincomingreq extends CustomError{
    statusCode=400;
    constructor(public errors:ValidationError[]){
        super('something goes wrong with creds')
        Object.setPrototypeOf(this,validateincomingreq.prototype)
    }
    
    summary(){
        return this.errors.map(err=>{
            return {message:err.msg,field:err.param}
        })
    }
}