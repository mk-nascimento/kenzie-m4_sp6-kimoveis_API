import 'dotenv/config';

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';

import { AppError } from '../error';

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const SECRET_KEY: string | undefined = String(process.env.SECRET_KEY);
    const headersToken: string | undefined = req.headers.authorization;

    if (!!!headersToken) throw new AppError('Missing bearer token', StatusCodes.UNAUTHORIZED);

    const [_, token]: Array<string> = headersToken.split(' ');

    verify(token, SECRET_KEY, (err: any, decoded: any) => {
        if (err) throw new AppError(err.message, StatusCodes.UNAUTHORIZED);

        res.locals.admin = decoded.admin;
        res.locals.userId = decoded.sub;
    });

    return next();
};

export const validateOnlyAdmin = async (_req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const admin: boolean = Boolean(res.locals.admin);

    if (!admin) throw new AppError('Insufficient permission', StatusCodes.FORBIDDEN);

    return next();
};

export const notTheUserOrAdmin = async (_req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const notAdmin: boolean = !!!Boolean(res.locals.admin);
    const loggedId: number = Number(res.locals.userId);
    const paramsId: number = Number(res.locals.validId);

    const notTheUser: boolean = loggedId !== paramsId;

    if (notAdmin && notTheUser) throw new AppError('Insufficient permission', StatusCodes.FORBIDDEN);

    return next();
};
