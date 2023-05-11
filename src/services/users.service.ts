import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities';

import * as t from '../interfaces';
import * as schemas from '../schemas';

export const createUserService = async (userPayload: t.TUserPayload): Promise<t.TUserResponse> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const userInstance: User = userRepo.create(userPayload);
    await userRepo.save(userInstance);

    const user: t.TUserResponse = schemas.userResponse.parse(userInstance);

    return user;
};

export const readUsersService = async (): Promise<t.TUserListResponse> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const dbUsers: Array<User> = await userRepo.find();
    const users: t.TUserListResponse = schemas.usersList.parse(dbUsers);

    return users;
};

export const updateUserService = async (
    updateUserPayload: t.TUserUpdatePayload,
    userId: number
): Promise<t.TUserResponse> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const oldDbUser: User | null = await userRepo.findOneBy({ id: userId });
    const userInstanceUpdate: User = userRepo.create({
        ...oldDbUser,
        ...updateUserPayload,
    });
    await userRepo.save(userInstanceUpdate);

    const user: t.TUserResponse = schemas.userResponse.parse(userInstanceUpdate);

    return user;
};

export const softDeleteUserService = async (userId: number): Promise<void> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const user: User | null = await userRepo.findOneBy({ id: userId });

    await userRepo.softRemove(user!);

    return;
};
