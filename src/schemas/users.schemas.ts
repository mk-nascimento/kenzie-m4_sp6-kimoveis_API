import { z } from 'zod';

export const user = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().email().max(45),
    password: z.string().max(120),
    admin: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullish(),
});

export const userPayload = user.omit({ id: true, createdAt: true, updatedAt: true, deletedAt: true });
export const userUpdate = userPayload.pick({ name: true, email: true, password: true }).partial();
export const DeepPartialUpdate = userPayload.pick({ name: true, email: true, password: true });
export const userResponse = user.omit({ password: true });
export const usersList = userResponse.array();

export const loginPayload = userPayload.pick({ email: true, password: true });
