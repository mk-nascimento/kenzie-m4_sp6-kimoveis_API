import { StatusCodes } from 'http-status-codes';
import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Address, Category, RealEstate } from '../entities';
import { AppError } from '../error';

import * as t from '../interfaces';

export const registerPropertyService = async (realEstatePayload: t.TRealEstatePayload): Promise<RealEstate> => {
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
    const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);
    const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category);

    const { city, state, street, zipCode }: t.TAddressPayload = realEstatePayload.address;
    const addressExists: boolean = await addressRepo.exist({ where: { city, state, street, zipCode } });
    if (!!addressExists) throw new AppError('Address already exists', StatusCodes.CONFLICT);

    const createAddressInstance: Address = addressRepo.create(realEstatePayload.address);
    await addressRepo.save(createAddressInstance);

    const dbCategory: Category | null = await categoryRepo.findOneBy({ id: Number(realEstatePayload.categoryId) });

    const realEstateBase: Partial<t.TRealEstatePayload> = realEstatePayload;
    delete realEstateBase.categoryId;

    const createRealEstateInstance: RealEstate = realEstateRepo.create({
        ...realEstateBase,
        address: createAddressInstance,
        category: dbCategory!,
    });
    await realEstateRepo.save(createRealEstateInstance);

    return createRealEstateInstance;
};

export const readPropertiesService = async (): Promise<Array<RealEstate>> => {
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const realEstateList: Array<RealEstate> = await realEstateRepo.find({ relations: { address: true } });

    return realEstateList;
};
