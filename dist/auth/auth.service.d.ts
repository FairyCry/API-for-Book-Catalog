import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    login(dto: UserDto): Promise<{
        token: string;
    }>;
    register(dto: UserDto): Promise<{
        token: string;
    }>;
}
