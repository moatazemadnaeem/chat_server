import { CustomError } from './customerr';
export class BadReqErr extends CustomError{
    statusCode=400;
    constructor(public msg:string){
        super(msg)
        Object.setPrototypeOf(this,BadReqErr.prototype)
    }
    summary(){
        return [{message:this.msg}]
    }
}