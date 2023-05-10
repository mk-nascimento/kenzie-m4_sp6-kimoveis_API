import { z } from 'zod';
import { addressPayload } from './addresses.schemas';

export const realEstate = z.object({
    id: z.number(),
    sold: z.boolean().default(false),
    value: z.number().nonnegative().default(0),
    size: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    addressId: z.number(),
    categoryId: z.number(),
});

export const realEstatePayload = realEstate.pick({ sold: true, value: true, size: true, categoryId: true }).extend({
    address: addressPayload,
});
