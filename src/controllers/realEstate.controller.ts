import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { RealEstate } from '../entities';

import * as services from '../services';

export const registerPropertyController = async (req: Request, res: Response): Promise<Response> => {
    const property: RealEstate = await services.registerPropertyService(req.body);

    return res.status(StatusCodes.CREATED).json(property);
};

export const readPropertiesController = async (_req: Request, res: Response): Promise<Response> => {
    const realEstateList: Array<RealEstate> = await services.readPropertiesService();

    return res.json(realEstateList);
};
