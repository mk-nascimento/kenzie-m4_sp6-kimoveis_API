import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RealEstate, User } from './';

@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    date: Date | string;

    @Column({ type: 'time' })
    hour: Date | string;

    @ManyToOne(() => RealEstate)
    realEstate: RealEstate;

    @ManyToOne(() => User)
    user: User;
}
