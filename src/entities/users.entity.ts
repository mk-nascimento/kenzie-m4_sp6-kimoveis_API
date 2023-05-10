import { getRounds, hashSync } from 'bcryptjs';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const cryptRounds: number = getRounds(this.password);

        if (!!!cryptRounds) {
            this.password = hashSync(this.password, 10);
        }
    }
}
