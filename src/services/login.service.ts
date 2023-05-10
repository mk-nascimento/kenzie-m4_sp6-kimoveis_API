import 'dotenv/config';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { AppError } from '../error';

import * as t from '../interfaces';

export const loginService = async (loginPayload: t.Tlogin): Promise<t.TToken> => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const dbUser: User | null = await userRepo.findOneBy({ email: loginPayload.email });
    if (!!!dbUser) throw new AppError('Invalid credentials', 401);

    const validPassword: boolean = await compare(loginPayload.password, dbUser?.password!);
    if (!!!validPassword) throw new AppError('Invalid credentials', 401);

    const token: string = sign({ admin: dbUser?.admin }, String(process.env.SECRET_KEY), {
        expiresIn: '24h',
        subject: String(dbUser?.id!),
    });

    return { token };
};
