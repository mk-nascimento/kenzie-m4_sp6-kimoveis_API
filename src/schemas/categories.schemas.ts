import { z } from 'zod';

export const category = z.object({
    id: z.number(),
    name: z.string().max(45),
});

export const categoryList = category.array();
export const categoryPayload = category.omit({ id: true });
