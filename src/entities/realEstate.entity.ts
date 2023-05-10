import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Address, Category } from '.';

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

    @CreateDateColumn()
    createdAt: Date | string;

    @UpdateDateColumn()
    updatedAt: Date | string;

    @OneToOne(() => Address)
    @JoinColumn()
    address: Address;

    @ManyToOne(() => Category)
    category: Category;
}
