import { Request, Response } from 'express';

import { loginService } from '../services';

import * as t from '../interfaces';

export const loginController = async (req: Request, res: Response): Promise<Response> => {
    const token: t.TToken = await loginService(req.body);

    return res.json(token);
};
