import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RealEstate } from './';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 45, unique: true })
    name: string;

    @OneToMany(() => RealEstate, (realEstate) => realEstate.category)
    realEstate: RealEstate[];
}
