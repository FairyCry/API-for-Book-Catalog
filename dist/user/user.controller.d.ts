import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    me(req: any): Promise<import("./entity/user.entity").User | null>;
    update(dto: UpdateUserDto, req: any): Promise<import("./entity/user.entity").User | null>;
    updateByAdmin(id: number, dto: UpdateUserDto): Promise<import("./entity/user.entity").User | null>;
}
