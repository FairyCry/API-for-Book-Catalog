import { IsEnum } from 'class-validator';
import { BookStatus } from '../entity/book.entity';

export class UpdateBookStatusDto {
    @IsEnum(BookStatus)
    status!: BookStatus;
}