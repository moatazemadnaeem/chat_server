import {Router} from 'express'
import __Router from "utils/routerInterface";
import UserController from '../../controllers/usersControllers'
import {Auth} from '../../middlewares/Auth'
class CurrentUser implements __Router{
    path='/users/current_user'
    router=Router()

    constructor() {
        this.initializeRoutes();
    }
   
    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            Auth,
            UserController.current
        );
    }
}

export default CurrentUser;