import { z } from 'zod';
import * as schemas from '../schemas';

export type Tlogin = z.infer<typeof schemas.loginPayload>;
export type TToken = { token: string };
