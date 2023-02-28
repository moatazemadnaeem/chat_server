import express, { Application } from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import {BadReqErr} from './errorsclasses/BadRequestError'
import {notfound} from './errorsclasses/notfound'
import {handelerr} from './middlewares/handelerr'
import cookieSession from 'cookie-session'
import __Router from 'utils/routerInterface';
class App{

    private express: Application;
    private port: number;

    constructor(routers: __Router[], port: number){
        this.express=express()
        this.port=port||9000
        this.initializeDatabaseConnection();
        this.initializeMiddleware()
        this.initializeRouters(routers);
        this.initializeErrorHandling();

    }

    private async initializeDatabaseConnection():Promise<Response | void>{
        if(!process.env.JWT_KEY){
            throw new BadReqErr('Jwt is not defined')
        }
        try{
            await mongoose.connect(process.env.DB_URL!)
            console.log('connected to db')
            this.listen()
        }catch (err){
            console.log(err,'err to connect')
        }
    }

    private listen():void{
        this.express.listen(this.port,()=>{
            console.log(`listening in port ${this.port}`)
        })
    }

    private initializeMiddleware():void{
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(
            cookieSession({
                signed:false,
                maxAge: 30 * 24 * 60 * 60 * 1000
            })
        )
    }

    private initializeRouters(routers:__Router[]):void{
        routers.forEach((routerInstance: __Router) => {
            this.express.use('/api/v1', routerInstance.router);
        });
        this.express.all('*',()=>{
            throw new notfound('can not find this page please try again')
        })
    }

    private initializeErrorHandling():void{
        this.express.use(handelerr)
    }
}
export default App;