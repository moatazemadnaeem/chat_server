import User from '../models/userModel'
interface userPayload{
    id:string;
    email:string;
}

export const IsValidUser=async(payload:userPayload)=>{

    const {id}=payload;

    const user=await User.findById(id)

    if(user?.isValid){
        return true
    }

    return false
}
