import {Router} from 'express'
import __Router from "utils/routerInterface";
import UserController from '../../controllers/usersControllers'
class SignOut implements __Router{
    path='/users/signout'
    router=Router()

    constructor() {
        this.initializeRoutes();
    }
   
    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            UserController.signout
        );
    }
}

export default SignOut;