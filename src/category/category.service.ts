import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { In, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async create(dto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(dto);
        return await this.categoryRepository.save(category);
    }

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    async findByIds(ids: number[]): Promise<Category[]> {
        return this.categoryRepository.find({
            where: { id: In(ids) }
        });
    }

    async delete(id: number): Promise<Category | null> {
        return this.categoryRepository.findOne({ where: { id } })
    }
}
