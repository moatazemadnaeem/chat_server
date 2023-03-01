import {Request,Response} from 'express'
import User from '../models/userModel';
import { BadReqErr } from '../errorsclasses/BadRequestError';
import { notfound } from '../errorsclasses/notfound';
import jwt from 'jsonwebtoken'
import { hashPass,comparePass } from '../utils/password';
import {SendEmail} from '../utils/sendEmail'
import {GetRandString} from '../utils/randomString'
const UserController={
    create_user:async(req:Request,res:Response)=>{
       const {name,email,password,role}=req.body;
       try{
        const exists=await User.findOne({email})
        if(exists){
           throw new BadReqErr('Email is already in use')
        }
        const uniqueString=GetRandString()
        const user=await User.create({name,email,password:hashPass(password),role,uniqueString})
        SendEmail(user.email,user.uniqueString);

        return res.status(201).send({name:user.name,email:user.email,id:user.id,role:user.role,msg:'User Created Successfully.'})
       }catch(err:any){
        throw new BadReqErr(err.message)
       }
    },
    signIn:async(req:Request,res:Response)=>{
        const {email,password}=req.body;
        //if user exist

        const existingUser=await User.findOne({email})
        if(!existingUser){
            throw new BadReqErr('invalid creds can not find user ')
        }

        //check password
        const validate=comparePass(password,existingUser.password)
        if(!validate){
            throw new BadReqErr('invalid creds  error in password')
        }
        //check if he/she valid
        if(!existingUser.isValid){
            throw new BadReqErr('please verify your email')
        }
        const token= jwt.sign({
            id:existingUser._id,
        },process.env.JWT_KEY!)
        req.session={
            jwt:token
        }
        console.log(existingUser)
        //send data
        res.status(200).send({
            name:existingUser.name,
            email:existingUser.email,
            status:true,
            id:existingUser._id,
            role:existingUser.role,
            token,
            msg:'Done Signing In.'
        })
    },
    signout:async(req:Request,res:Response)=>{
        req.session=null
        res.send({
            token:null,
            currentUser:null,
        })
    },
    current:async(req:Request,res:Response)=>{
        if(req.currentUser){
          try{
            const user= await User.findById(req.currentUser.id)
            if(user){
                const {name,email,_id,role}=user
                return res.send({
                    name,
                    email,
                    id:_id,
                    status:true,
                    role
                })
            }
            throw new notfound('this user can not be found')
            
          }catch(err:any){
            throw new notfound(err.message)
          }
         
        }
        return res.send({currentUser:null})
    },
    verfiyUser:async(req:Request,res:Response)=>{
        const {uniqueString}=req.params;
        try{
            const user=await User.findOne({uniqueString})
    
            if(user){
                user.isValid=true;
                await user.save()
                res.send('<h1>Done Verifying Please Return Back To The website.</h1>')
            }
            else{
                throw new notfound('can not find the user')
            }
        }catch(err:any){
            throw new BadReqErr(err.message)
        }
    },
}
export default UserController