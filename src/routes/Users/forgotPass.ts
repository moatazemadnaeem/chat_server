import {Router} from 'express'
import __Router from "utils/routerInterface";
import {body} from 'express-validator'
import UserController from '../../controllers/usersControllers'
import {validatereq} from '../../middlewares/validateReq'
class ForgotPass implements __Router{
    path='/users/forgot-pass'
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
            UserController.forgotPassword
        );
    }
}

export default ForgotPass;