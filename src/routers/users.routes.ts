import { Router } from 'express';

import * as ctrl from '../controllers';
import * as mw from '../middlewares';
import * as schemas from '../schemas';

export const usersRouter: Router = Router();

usersRouter.post('', mw.bodySerializer(schemas.userPayload), mw.validateEmail, ctrl.createUserControler);
usersRouter.get('', mw.validateToken, mw.validateOnlyAdmin, ctrl.readUsersController);
usersRouter.patch(
    '/:id',
    mw.validateUserId,
    mw.validateToken,
    mw.notTheUserOrAdmin,
    mw.bodySerializer(schemas.userUpdate),
    mw.validateEmail,
    ctrl.updateUserController
);
usersRouter.delete('/:id', mw.validateUserId, mw.validateToken, mw.validateOnlyAdmin, ctrl.deleteUserController);
