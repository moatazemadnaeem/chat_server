import 'dotenv/config';
import 'express-async-errors'
import App from './app';
import CreateUser from './routes/Users/createUser';
import SignIn from './routes/Users/signIn';
import SignOut from './routes/Users/signOut';
import CurrentUser from './routes/Users/currentUser';
import VerifyUser from './routes/Users/verifyUser';

new App([
    //Users
    new CreateUser(),
    new SignIn(),
    new SignOut(),
    new CurrentUser(),
    new VerifyUser()
],Number(process.env.PORT))