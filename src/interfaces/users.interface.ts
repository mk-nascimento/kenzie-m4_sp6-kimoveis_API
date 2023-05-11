import { z } from 'zod';
import * as TORM from 'typeorm';
import * as schemas from '../schemas';

export type TUser = z.infer<typeof schemas.user>;
export type TUserResponse = z.infer<typeof schemas.userResponse>;
export type TUserListResponse = z.infer<typeof schemas.usersList>;
export type TUserPayload = z.infer<typeof schemas.userPayload>;

type TUserUpdate = z.infer<typeof schemas.DeepPartialUpdate>;
export type TUserUpdatePayload = TORM.DeepPartial<TUserUpdate>;
