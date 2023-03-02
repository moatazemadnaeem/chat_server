import {Router} from 'express'
import __Router from "utils/routerInterface";
import {body} from 'express-validator'
import UserController from '../../controllers/usersControllers'
import {validatereq} from '../../middlewares/validateReq'
class AddNewPass implements __Router{
    path='/users/reset-pass'
    router=Router()

    constructor() {
        this.initializeRoutes();
    }
 
    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            [
                body('email').isEmail().withMessage('Email must be valid'),
                body('newpass').trim().isLength({min:6,max:255}).withMessage('Password must be at least 6 chars long and 255 max'),
            ],
            validatereq,
            UserController.resetPassword
        );
    }
}

export default AddNewPass;