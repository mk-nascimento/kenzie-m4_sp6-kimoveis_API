import { StatusCodes } from 'http-status-codes';
import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Category, RealEstate } from '../entities';

import { AppError } from '../error';
import * as t from '../interfaces';
import * as schemas from '../schemas';

export const createCategorieService = async (categoryPayload: t.TCategoryPayload): Promise<t.TCategory> => {
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category);

    const categoryExists: boolean = await categoryRepo.exist({ where: { name: categoryPayload.name } });
    if (!!categoryExists) throw new AppError('Category already exists', StatusCodes.CONFLICT);

    const categoryInstance: Category = categoryRepo.create(categoryPayload);
    await categoryRepo.save(categoryInstance);

    const category: t.TCategory = schemas.category.parse(categoryInstance);

    return category;
};

export const readCategoriesService = async (): Promise<t.TCategoriesList> => {
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category);

    const dbCategories: Array<Category> = await categoryRepo.find();
    const categories: t.TCategoriesList = schemas.categoryList.parse(dbCategories);

    return categories;
};

export const readCategoryWithRealEstateService = async (paramsId: number): Promise<any> => {
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category);

    const categoryExists: boolean = await categoryRepo.exist({ where: { id: paramsId } });
    if (!!!categoryExists) throw new AppError('Category not found', StatusCodes.NOT_FOUND);

    const dbCategoryWithProperties: Category | null = await categoryRepo.findOne({
        where: { id: paramsId },
        relations: { realEstate: true },
    });

    return dbCategoryWithProperties;
};
