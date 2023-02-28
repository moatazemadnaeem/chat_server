import { CustomError } from './customerr';
export class notfound extends CustomError{
    statusCode=404;
    constructor(public msg:string){
        super(msg)
        Object.setPrototypeOf(this,notfound.prototype)
    }
    summary(){
        return [{message:this.msg}]
    }
}