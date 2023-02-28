import {Router} from 'express'
import __Router from "utils/routerInterface";
import UserController from '../../controllers/usersControllers'
class VerifyUser implements __Router{
    path='/users/verfiy_user/:uniqueString'
    router=Router()

    constructor() {
        this.initializeRoutes();
    }
   
    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            UserController.verfiyUser
        );
    }
}

export default VerifyUser;