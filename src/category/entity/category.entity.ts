import { Entity, PrimaryGeneratedColumn, Column, } from 'typeorm';
import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, unique: true })
    name!: string;

    @CreateDateColumn()
    createDate!: Date;

    @UpdateDateColumn()
    updateDate!: Date;

}
