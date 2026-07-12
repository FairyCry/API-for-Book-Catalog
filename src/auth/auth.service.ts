import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../user/dto/user.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(dto: UserDto) {
        const user = await this.usersService.findUserWithPassword(dto.email);
        if (!user) throw new UnauthorizedException('неверный логин или пароль');

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('неверный логин или пароль');

        const token = this.jwtService.sign({ userId: user.id, role: user.role });
        return { token };
    }

    async register(dto: UserDto) {
        const user = await this.usersService.create(dto);
        const token = this.jwtService.sign({ userId: user.id, role: user.role })
        return { token };
    }
}