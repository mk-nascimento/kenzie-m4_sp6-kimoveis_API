import { z } from 'zod';
import * as schemas from '../schemas';

export type TAddress = z.infer<typeof schemas.address>;
export type TAddressPayload = z.infer<typeof schemas.addressPayload>;
