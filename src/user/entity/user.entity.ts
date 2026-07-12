import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../../book/entity/book.entity';
export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ unique: true, nullable: false })
    email!: string;

    @Column({ select: false, nullable: false })
    password!: string;

    @OneToMany(() => Book, (book) => book.author)
    books!: Book[];

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role!: UserRole;
}
