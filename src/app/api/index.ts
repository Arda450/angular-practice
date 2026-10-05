import { Router } from 'express';
import { loginRoute } from './auth/login.route';
import { logoutRoute } from './auth/logout.route';
import { meRoute } from './auth/me.route';
import { checkIfAuthenticated } from './auth/auth.middleware';
import { registerRoute } from './auth/register.route';

export const apiRouter = Router();
apiRouter.post('/auth/login', loginRoute);
apiRouter.post('/auth/logout', logoutRoute);
apiRouter.get('/auth/me', checkIfAuthenticated, meRoute); // bei erfolg -> meRoute
apiRouter.post('/auth/register', registerRoute);
