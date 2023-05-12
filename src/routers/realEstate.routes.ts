import { Router } from 'express';

import * as ctrl from '../controllers';
import * as mw from '../middlewares';
import * as schemas from '../schemas';

export const realEstateRouter: Router = Router();

realEstateRouter.post(
    '',
    mw.validateToken,
    mw.validateOnlyAdmin,
    mw.bodySerializer(schemas.realEstatePayload),
    ctrl.registerPropertyController
);
realEstateRouter.get('', ctrl.readPropertiesController);
