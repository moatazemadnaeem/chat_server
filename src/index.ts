import 'dotenv/config';
import 'express-async-errors'
import App from './app';
import CreateUser from './routes/Users/createUser';
import SignIn from './routes/Users/signIn';
import SignOut from './routes/Users/signOut';
import CurrentUser from './routes/Users/currentUser';
import VerifyUser from './routes/Users/verifyUser';
import ForgotPass from './routes/Users/forgotPass';
import SendOtpReset from './routes/Users/sendOtpReset';
import AddNewPass from './routes/Users/addNewPass';
import ResendOtp from './routes/Users/resendOtp';
import ResendOtpReset from './routes/Users/resendOtpReset';
import CheckToken from './routes/Users/checkToken';
new App([
    //Users
    new CreateUser(),
    new SignIn(),
    new SignOut(),
    new CurrentUser(),
    new VerifyUser(),
    new ForgotPass(),
    new SendOtpReset(),
    new AddNewPass(),
    new ResendOtp(),
    new ResendOtpReset(),
    new CheckToken()
],Number(process.env.PORT))