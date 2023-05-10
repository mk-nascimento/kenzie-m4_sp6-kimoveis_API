import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { AppError } from '../error';
import { TUserPayload } from '../interfaces';

export const validateEmail = async (req: Request, __res: Response, next: NextFunction): Promise<Response | void> => {
    const { email: reqEmail }: Pick<TUserPayload, 'email'> = req.body;

    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const emailExists: boolean = await userRepo.exist({ where: { email: reqEmail } });

    if (reqEmail && emailExists) throw new AppError('Email already exists', StatusCodes.CONFLICT);

    return next();
};
