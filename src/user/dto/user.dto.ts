import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UserDto {
    @IsString()
    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    name!: string;

    @IsEmail({}, { message: 'Некорректный формат email' })
    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    email!: string;

    @IsString()
    @IsNotEmpty({ message: 'Поле не может быть пустым' })
    password!: string;
}
