import { Router } from 'express';

import * as mw from '../middlewares';
import * as ctrl from '../controllers';
import * as schemas from '../schemas';

export const schedulesRouter: Router = Router();

schedulesRouter.post(
    '',
    mw.validateToken,
    mw.bodySerializer(schemas.schedulePayload),
    mw.validRealEstateId,
    ctrl.createScheduleController
);
schedulesRouter.get(
    '/realEstate/:id',
    mw.validateToken,
    mw.validateOnlyAdmin,
    mw.validRealEstateId,
    ctrl.readSchedulePropertyController
);
