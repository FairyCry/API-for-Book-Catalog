import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: UserDto): Promise<{
        token: string;
    }>;
    register(dto: UserDto): Promise<{
        token: string;
    }>;
}
