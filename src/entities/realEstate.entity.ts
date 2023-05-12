import {
    AfterLoad,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Address, Category } from './';

@Entity('real_estate')
export class RealEstate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'boolean', default: false })
    sold: boolean;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    value: number | string;

    @Column({ type: 'integer' })
    size: number;

    @CreateDateColumn({ type: 'date' })
    createdAt: Date | string;

    @UpdateDateColumn({ type: 'date' })
    updatedAt: Date | string;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @ManyToOne(() => Category, (category) => category.realEstate)
    category: Category;

    @AfterLoad()
    stringValue() {
        this.value = Number(this.value).toFixed(2).toString();
    }
}
