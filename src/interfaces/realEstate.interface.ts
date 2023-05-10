import { z } from 'zod';
import * as schemas from '../schemas';

export type TRealEstate = z.infer<typeof schemas.realEstate>;
export type TRealEstatePayload = z.infer<typeof schemas.realEstatePayload>;
