import 'dotenv/config';
import 'express-async-errors'
import App from './app';
import CreateUser from './routes/Users/createUser';

new App([
    new CreateUser()
],Number(process.env.PORT))