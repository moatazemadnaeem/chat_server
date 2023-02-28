export abstract class CustomError extends Error{
    constructor(message:string) {
        super(message)
        Object.setPrototypeOf(this,CustomError.prototype)
    }
    abstract statusCode:number;

    abstract summary():{message:string;feild?:string}[]
}