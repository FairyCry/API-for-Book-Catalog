import { IsNotEmpty, IsString, MaxLength,  } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    @MaxLength(15)
    name!: string;
}
