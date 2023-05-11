import { Router } from 'express';

import * as crtl from '../controllers';
import * as mw from '../middlewares';
import * as schemas from '../schemas';

export const categoriesRouter: Router = Router();

categoriesRouter.post(
    '',
    mw.validateToken,
    mw.validateOnlyAdmin,
    mw.bodySerializer(schemas.categoryPayload),
    crtl.createCategoryController
);
categoriesRouter.get('', crtl.readCategoriesController);
categoriesRouter.get('/:id/realEstate', crtl.readCategoryWithRealEstateController);
