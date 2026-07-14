import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    findUserWithPassword(email: string): Promise<User | null>;
    create(dto: UserDto): Promise<User>;
    findUserById(id: number): Promise<User | null>;
    update(id: number, dto: UpdateUserDto): Promise<User | null>;
}
