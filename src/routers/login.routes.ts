import { Router } from 'express';

export const loginRouter: Router = Router();

loginRouter.post('', () => console.log('Login realizando'));
