import {Router} from 'express'
import __Router from "utils/routerInterface";
import {body} from 'express-validator'
import UserController from '../../controllers/usersControllers'
import {validatereq} from '../../middlewares/validateReq'
class ResendOtpReset implements __Router{
    path='/users/resend-otp-reset'
    router=Router()

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            [
                body('email').isEmail().withMessage('Email must be valid'),
            ],
            validatereq,
            UserController.resendOtpReset
        );
    }
}

export default ResendOtpReset;