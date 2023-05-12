import { z } from 'zod';

export const schedule = z.object({
    id: z.number(),
    hour: z.string(),
    date: z.string(),
    realEstateId: z.number(),
    userId: z.number(),
});

export const schedulePayload = schedule.omit({ id: true, userId: true });
