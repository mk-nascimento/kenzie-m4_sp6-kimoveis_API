import { z } from 'zod';

import * as schemas from '../schemas';

export type TRealEstate = z.infer<typeof schemas.realEstate>;
export type TRealEstatePayload = z.infer<typeof schemas.realEstatePayload>;
export type TRealEstateResponse = z.infer<typeof schemas.realEstateResponse>;
export type TRealEstateInstance = z.infer<typeof schemas.realEstateInstance>;
