import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities';

import * as t from '../interfaces';
import * as schemas from '../schemas';

export const createUserService = async (userPayload: t.TUserPayload): Promise<t.TUserResponse> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const dbUser: User = userRepo.create(userPayload);
    await userRepo.save(dbUser);

    const user: t.TUserResponse = schemas.userResponse.parse(dbUser);

    return user;
};

export const readUsersService = async (): Promise<t.TUserList> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const dbUsers: Array<User> = await userRepo.find();
    const users: t.TUserList = schemas.usersList.parse(dbUsers);

    return users;
};
