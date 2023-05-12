import { z } from 'zod';

import * as schemas from '../schemas';

export type TSchedule = z.infer<typeof schemas.schedule>;
export type TSchedulePayload = z.infer<typeof schemas.schedulePayload>;
export type TScheduleCreated = { message: string };
