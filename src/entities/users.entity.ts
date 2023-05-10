import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 45 })
    name: string;

    @Column({ type: 'varchar', length: 45, unique: true })
    email: string;

    @Column({ type: 'boolean', default: false })
    admin: boolean;

    @Column({ type: 'varchar', length: 120 })
    password: string;

    @CreateDateColumn()
    createdAt: Date | string;

    @UpdateDateColumn()
    updatedAt: Date | string;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | string | null | undefined;
}
