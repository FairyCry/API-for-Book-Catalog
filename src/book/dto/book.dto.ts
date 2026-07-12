import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BookDto {
    @IsString()
    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    title!: string;

    @IsOptional()
    @IsString({ message: 'Некорректный формат' })
    description?: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    categoryIds!: number[];

}
