import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RealEstate } from './';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 45 })
    name: string;

    @OneToMany(() => RealEstate, (realEstate) => realEstate.category)
    realEstate: RealEstate[];
}
