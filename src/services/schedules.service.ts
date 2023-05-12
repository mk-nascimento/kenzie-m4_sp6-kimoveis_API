import { StatusCodes } from 'http-status-codes';
import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { RealEstate, Schedule, User } from '../entities';
import { AppError } from '../error';

import * as t from '../interfaces';

export const createScheduleService = async (
    schedulePaylod: t.TSchedulePayload,
    userId: number
): Promise<t.TScheduleCreated> => {
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
    const scheduleRepo: Repository<Schedule> = AppDataSource.getRepository(Schedule);
    const userRepo: Repository<User> = AppDataSource.getRepository(User);

    const [year, day, month] = schedulePaylod.date.split('/');
    const [hour, _] = schedulePaylod.hour.split(':');

    const getDay: number = new Date(Number(year), Number(month) - 1, Number(day)).getDay();
    const workDay: boolean = getDay > 0 && getDay < 6;
    const comercialHour: boolean = Number(hour) > 8 && Number(hour) < 18;

    const realEstateSchedule: Schedule | null = await scheduleRepo
        .createQueryBuilder('schedules')
        .leftJoinAndSelect('schedules.realEstate', 'realEstate')
        .where('realEstate.id = :id', { id: schedulePaylod.realEstateId })
        .andWhere('schedules.date = :date', { date: schedulePaylod.date })
        .andWhere('schedules.hour = :hour', { hour: schedulePaylod.hour })
        .getOne();
    const userSchedule: Schedule | null = await scheduleRepo
        .createQueryBuilder('schedules')
        .leftJoinAndSelect('schedules.user', 'user')
        .where('user.id = :id', { id: userId })
        .andWhere('schedules.date = :date', { date: schedulePaylod.date })
        .andWhere('schedules.hour = :hour', { hour: schedulePaylod.hour })
        .getOne();

    if (realEstateSchedule)
        throw new AppError('Schedule to this real estate at this date and time already exists', StatusCodes.CONFLICT);
    if (userSchedule)
        throw new AppError(
            'User schedule to this real estate at this date and time already exists',
            StatusCodes.CONFLICT
        );
    if (!workDay) throw new AppError('Invalid date, work days are monday to friday');
    if (!comercialHour) throw new AppError('Invalid hour, available times are 8AM to 18PM');

    const realEstateInstance: RealEstate | null = await realEstateRepo.findOneBy({ id: schedulePaylod.realEstateId });
    const userInstance: User | null = await userRepo.findOneBy({ id: userId });

    const scheduleInstance: Schedule = scheduleRepo.create({
        date: schedulePaylod.date,
        hour: schedulePaylod.hour,
        realEstate: realEstateInstance!,
        user: userInstance!,
    });
    await scheduleRepo.save(scheduleInstance);

    return { message: 'Schedule created' };
};

export const readSchedulePropertyService = async (realEstateId: number): Promise<RealEstate> => {
    const realEstate: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
    const schedulesProperty: RealEstate | null = await realEstate
        .createQueryBuilder('real_estate')
        .leftJoinAndSelect('real_estate.address', 'address')
        .leftJoinAndSelect('real_estate.category', 'category')
        .leftJoinAndSelect('real_estate.schedules', 'schedules')
        .leftJoinAndSelect('schedules.user', 'user')
        .where('real_estate.id = :realEstateId', { realEstateId })
        .getOne();

    return schedulesProperty!;
};
