import {Router} from 'express'
import __Router from "utils/routerInterface";
import UserController from '../../controllers/usersControllers'
import {Auth} from '../../middlewares/Auth'
class CheckToken implements __Router{
    path='/users/check_token'
    router=Router()

    constructor() {
        this.initializeRoutes();
    }
   
    private initializeRoutes(): void {
        this.router.get(
            `${this.path}`,
            Auth,
            UserController.checkToken
        );
    }
}

export default CheckToken;