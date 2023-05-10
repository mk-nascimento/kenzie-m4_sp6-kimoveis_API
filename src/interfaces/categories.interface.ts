import { z } from 'zod';
import * as schemas from '../schemas';

export type TCategory = z.infer<typeof schemas.category>;
export type TCategoryPayload = z.infer<typeof schemas.categoryPayload>;
