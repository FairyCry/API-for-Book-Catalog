import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { Not, Repository } from 'typeorm';
import { BookDto } from './dto/book.dto';
import { User } from '../user/entity/user.entity';
import { BookFilterDto } from './dto/bookFilter.dto';
import { CategoryService } from '../category/category.service';
import { BookStatus } from './entity/book.entity';
import { UpdateBookStatusDto } from './dto/update-status.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
        private readonly categoryService: CategoryService,
    ) { }

    async create(dto: BookDto, userId: number) {
        const categories = dto.categoryIds?.length
            ? await this.categoryService.findByIds(dto.categoryIds)
            : [];
        const book = this.bookRepository.create({
            ...dto,
            categories,
            author: { id: userId } as User
        })
        return this.bookRepository.save(book)
    }

    async findAll(query: BookFilterDto) {
        const { genre, page = 1, limit = 10 } = query;

        const qb = this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.author', 'author')
            .leftJoinAndSelect('book.categories', 'category')
            .where('book.status = :status', { status: BookStatus.APPROVED })
            .orderBy('book.createDate', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);

        if (genre) {
            qb.andWhere('category.name = :genre', { genre });
        }

        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }

    async findAllPending() {
        const qb = this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.author', 'author')
            .leftJoinAndSelect('book.categories', 'category')
            .where('book.status = :status', { status: BookStatus.PENDING })
            .orderBy('book.createDate', 'ASC');

        const [data, total] = await qb.getManyAndCount();
        return { data, total };
    }

    async changeStatus(id: number, dto: UpdateBookStatusDto) {
        const book = await this.bookRepository.findOne({ where: { id } });
        if (!book) throw new NotFoundException(`Книга с id ${id} не найдена`);
        book.status = dto.status;
        return this.bookRepository.save(book);
    }

    async findOne(id: number): Promise<Book | null> {
        const book = await this.bookRepository.findOne({ where: { id } })
        if (!book) throw new NotFoundException(`книга с id ${id} не найдена`);
        return book;
    }

    async delete(id: number, userId: number) {
        const book = await this.bookRepository.findOne({
            where: { id },
            relations: { author: true }
        });
        if (!book) throw new NotFoundException(`Книга с id ${id} не найдена`);
        if (book?.author.id != userId) throw new ForbiddenException(`у вас нет прав`);
        await this.bookRepository.remove(book);
        return book;
    }

    async update(id: number, userId: number, dto: UpdateBookDto) {
        const book = await this.bookRepository.findOne({
            where: { id },
            relations: { author: true }
        });
        if (!book) throw new NotFoundException(`Книга с id ${id} не найдена`);
        if (book.author.id != userId) throw new ForbiddenException(`У вас недостаточно прав`);
        await this.bookRepository.update(
            id,
            {
                title: dto.title,
                description: dto.description,
            }
        );
        return await this.bookRepository.findOne({ where: { id } })
    }
}
