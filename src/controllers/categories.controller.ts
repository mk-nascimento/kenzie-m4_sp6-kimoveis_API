import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as t from '../interfaces';
import * as services from '../services';
import { Category } from '../entities';

export const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
    const category: t.TCategory = await services.createCategorieService(req.body);

    return res.status(StatusCodes.CREATED).json(category);
};

export const readCategoriesController = async (_req: Request, res: Response): Promise<Response> => {
    const categories: t.TCategoriesList = await services.readCategoriesService();

    return res.json(categories);
};

export const readCategoryWithRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const paramsId: number = Number(req.params.id);

    const categoryWithRealEstate: Category = await services.readCategoryWithRealEstateService(paramsId);

    return res.json(categoryWithRealEstate);
};
