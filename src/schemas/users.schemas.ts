import { z } from 'zod';

export const user = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().max(45),
    password: z.string().max(120),
    admin: z.boolean().default(false),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullish(),
});

export const userPayload = user.omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true });
export const userUpdate = userPayload.pick({ name: true, email: true, password: true }).partial();
export const userResponse = user.omit({ password: true });
export const usersList = userResponse.array();
