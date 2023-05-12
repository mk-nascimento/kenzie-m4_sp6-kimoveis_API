import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { RealEstate } from '../entities';

import * as t from '../interfaces';
import * as services from '../services';

export const createScheduleController = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = Number(res.locals.userId);
    const schedule: t.TScheduleCreated = await services.createScheduleService(req.body, userId);

    return res.status(StatusCodes.CREATED).json(schedule);
};

export const readSchedulePropertyController = async (req: Request, res: Response): Promise<Response> => {
    const realEstateId: number = Number(res.locals.realEstateId);

    const propertySchedules: RealEstate = await services.readSchedulePropertyService(realEstateId);

    return res.json(propertySchedules);
};
