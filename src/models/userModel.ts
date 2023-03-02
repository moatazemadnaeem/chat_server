import mongoose from 'mongoose'
import {roles} from '../utils/roles'
interface UserRes extends mongoose.Document{
    name:string;
    email:string;
    password:string;
    isValid?:boolean;
    role:string;
    uniqueString?:string;
    uniqueResetPassStr?:string;
}
const userschema=new mongoose.Schema<UserRes>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    isValid:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:Object.values(roles),
        required:true
    },
    uniqueString:{
        type:String,
    },
    uniqueResetPassStr:{
        type:String,
    }
},
{
    toJSON:{
        transform(doc,ret){
            ret.id=ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps:true
}
);

const User=mongoose.model<UserRes>('User',userschema)

export default User;
