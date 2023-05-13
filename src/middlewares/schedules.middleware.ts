import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { RealEstate } from '../entities';
import { AppError } from '../error';

import * as t from '../interfaces';

export const validRealEstateId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const schedulePayload: t.TSchedulePayload = req.body;
    const paramsId: number = Number(req.params.id);
    const payloadId: number = Number(schedulePayload.realEstateId);
    const id: number = paramsId | payloadId;

    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const realEstateExist: boolean = await realEstateRepo.exist({ where: { id } });
    if (!!!realEstateExist) throw new AppError('RealEstate not found', StatusCodes.NOT_FOUND);

    res.locals.realEstateId = id;

    return next();
};
