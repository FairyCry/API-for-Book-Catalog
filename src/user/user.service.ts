import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findUserWithPassword(email: string): Promise<User | null> {
        return this.userRepository
            .createQueryBuilder('user')
            .where(`user.email = :email`, { email })
            .addSelect(`user.password`)
            .getOne();
    }

    async create(dto: UserDto): Promise<User> {
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({
            ...dto,
            password: passwordHash
        });
        return this.userRepository.save(user);
    }

    async findUserById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id } })
    }


    async update(id: number, dto: UpdateUserDto) {
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }
        await this.userRepository.update(id, dto);
        return this.userRepository.findOne({ where: { id } });
    }
}

