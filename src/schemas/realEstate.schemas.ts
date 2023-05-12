import { z } from 'zod';

import { address, addressPayload } from './addresses.schemas';

export const realEstate = z.object({
    id: z.number(),
    sold: z.boolean().default(false),
    value: z.number().nonnegative().default(0).or(z.string()),
    size: z.number().int().positive(),
    createdAt: z.string(),
    updatedAt: z.string(),
    addressId: z.number(),
    categoryId: z.number(),
});

export const realEstatePayload = realEstate.pick({ sold: true, value: true, size: true, categoryId: true }).extend({
    address: addressPayload,
});
export const realEstateResponse = realEstate.omit({ addressId: true, categoryId: true }).extend({ address: address });
export const realEstateInstance = realEstateResponse.omit({ id: true });
