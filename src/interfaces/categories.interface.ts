import { z } from 'zod';

import * as schemas from '../schemas';

export type TCategory = z.infer<typeof schemas.category>;
export type TCategoriesList = z.infer<typeof schemas.categoryList>;
export type TCategoryPayload = z.infer<typeof schemas.categoryPayload>;
export type TCategoryListWithProperties = z.infer<typeof schemas.categoryListWithProperties>;
