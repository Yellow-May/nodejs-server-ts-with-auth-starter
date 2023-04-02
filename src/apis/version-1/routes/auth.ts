/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { LOGIN_USER, LOGOUT_USER, REFRESH_TOKEN } from '../controllers/auth';

const AuthRouter = Router();

AuthRouter.route('/login').post(LOGIN_USER);
AuthRouter.route('/logout').delete(LOGOUT_USER);
AuthRouter.route('/refresh').get(REFRESH_TOKEN);

export default AuthRouter;
