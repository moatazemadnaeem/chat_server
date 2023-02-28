const nodemailer=require('nodemailer')

export const SendEmail=(email:string,uniqueString:string|undefined)=>{

    const Transport=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'moatazemad772@gmail.com',
            pass:process.env.NODEMAILERPASS
        },
    })
    const mailOptions={
        from:'moatazemad772@gmail.com',
        to:email,
        subject:'Email confirmation',
        text:`Please Press This Link https://yellow-narwhal-vest.cyclic.app/api/v1/users/verfiy_user/${uniqueString} to verify your email. Thanks`
    }
    Transport.sendMail(mailOptions,function(err:any,res:any){
        if(err){
            console.log('Error',err)
        }else{
            console.log('Response',res)
        }
    })
}