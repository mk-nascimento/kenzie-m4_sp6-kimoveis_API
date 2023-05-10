import { Router } from 'express';

import * as crtl from '../controllers';
import * as mw from '../middlewares';
import * as schemas from '../schemas';

export const loginRouter: Router = Router();

loginRouter.post('', mw.bodySerializer(schemas.loginPayload), crtl.loginController);
