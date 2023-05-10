import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as t from '../interfaces';
import * as services from '../services';

export const createUserControler = async (req: Request, res: Response): Promise<Response> => {
    const user: t.TUserResponse = await services.createUserService(req.body);

    return res.status(StatusCodes.CREATED).json(user);
};

export const readUsersController = async (__req: Request, res: Response): Promise<Response> => {
    const users = await services.readUsersService();

    return res.json(users);
};
