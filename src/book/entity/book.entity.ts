import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Category } from '../../category/entity/category.entity';
import { IsOptional } from 'class-validator';
export enum BookStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}
@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, unique: true })
    title!: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToOne(() => User, (user) => user.books)
    author!: User;

    @ManyToMany(() => Category)
    @JoinTable()
    categories!: Category[];

    @Column({ type: 'enum', enum: BookStatus, default: BookStatus.PENDING })
    status!: BookStatus;

    @UpdateDateColumn()
    updateDate!: Date;

    @CreateDateColumn()
    createDate!: Date;
}
