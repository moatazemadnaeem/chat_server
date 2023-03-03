import nodemailer from 'nodemailer'
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
export const SendEmailOld=(email:string,uniqueString:string|undefined,forgot:boolean=false)=>{

    const Transport=nodemailer.createTransport({
        host: 'smtp.zoho.eu',
        port: 465,
        secure: true,
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
        text:forgot?`Type this otp in your app ( ${uniqueString} ) to reset your password. Thanks`:`Please Press This Link https://yellow-narwhal-vest.cyclic.app/api/v1/users/verfiy_user/${uniqueString} to verify your email. Thanks`
    }
    console.log(mailOptions)
    Transport.sendMail(mailOptions,function(err:any,res:any){
        if(err){
            console.log('Error',err)
        }else{
            console.log('Response',res)
        }
    })
}
export const SendEmail=(email:string,uniqueString:string|undefined,forgot:boolean=false)=>{
   
    const msg = {
      to: email, 
      from: 'moatazwork0@gmail.com', 
      subject:'Email confirmation',
      text:forgot?`Type this otp in your app ( ${uniqueString} ) to reset your password. Thanks`:`Please Press This Link https://yellow-narwhal-vest.cyclic.app/api/v1/users/verfiy_user/${uniqueString} to verify your email. Thanks`
    }
    sgMail
    .send(msg)
    .then(() => {
    console.log('Email sent')
    })
    .catch((error) => {
    console.error(error)
    })
}
