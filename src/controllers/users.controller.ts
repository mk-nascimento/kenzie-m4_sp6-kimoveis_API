import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as t from '../interfaces';
import * as services from '../services';

export const createUserControler = async (req: Request, res: Response): Promise<Response> => {
    const user: t.TUserResponse = await services.createUserService(req.body);

    return res.status(StatusCodes.CREATED).json(user);
};

export const readUsersController = async (_req: Request, res: Response): Promise<Response> => {
    const users: t.TUserListResponse = await services.readUsersService();

    return res.json(users);
};

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
    const paramsId: number = Number(res.locals.validId);

    const user: t.TUserResponse = await services.updateUserService(req.body, paramsId);

    return res.json(user);
};

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    const paramsId: number = Number(req.params.id);

    await services.softDeleteUserService(paramsId);

    return res.status(StatusCodes.NO_CONTENT).send();
};
