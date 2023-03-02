import {Router} from 'express'
import __Router from "utils/routerInterface";
import {body} from 'express-validator'
import UserController from '../../controllers/usersControllers'
import {validatereq} from '../../middlewares/validateReq'
class SendOtpReset implements __Router{
    path='/users/send-otp'
    router=Router()

    constructor() {
        this.initializeRoutes();
    }
 
    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            [
                body('email').isEmail().withMessage('Email must be valid'),
                body('uniqueString').notEmpty().withMessage('Please provide the correct otp'),
            ],
            validatereq,
            UserController.sendOtp
        );
    }
}

export default SendOtpReset;