import {Request,Response} from 'express'
import User from '../models/userModel';
import { BadReqErr } from '../errorsclasses/BadRequestError';
import jwt from 'jsonwebtoken'
import { hashPass } from '../utils/password';
const UserController={
    create_user:async(req:Request,res:Response)=>{
       const {name,email,password,role}=req.body;
       try{
        const exists=await User.findOne({email})
        if(exists){
           throw new BadReqErr('Email is already in use')
        }
        const user=await User.create({name,email,password:hashPass(password),role})
        const token= jwt.sign({
            id:user.id,
        },process.env.JWT_KEY!)
        req.session={
            jwt:token
        }
        return res.status(201).send({name:user.name,email:user.email,id:user.id,role:user.role,token,msg:'User Created Successfully.'})
       }catch(err:any){
        throw new BadReqErr(err.message)
       }
    }
}
export default UserController