"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const book_entity_1 = require("./entity/book.entity");
const typeorm_2 = require("typeorm");
const category_service_1 = require("../category/category.service");
const book_entity_2 = require("./entity/book.entity");
let BookService = class BookService {
    bookRepository;
    categoryService;
    constructor(bookRepository, categoryService) {
        this.bookRepository = bookRepository;
        this.categoryService = categoryService;
    }
    async create(dto, userId) {
        const categories = dto.categoryIds?.length
            ? await this.categoryService.findByIds(dto.categoryIds)
            : [];
        const book = this.bookRepository.create({
            ...dto,
            categories,
            author: { id: userId }
        });
        return this.bookRepository.save(book);
    }
    async findAll(query) {
        const { genre, page = 1, limit = 10 } = query;
        const qb = this.bookRepository
            .createQueryBuilder('book')
            .leftJoinAndSelect('book.author', 'author')
            .leftJoinAndSelect('book.categories', 'category')
            .where('book.status = :status', { status: book_entity_2.BookStatus.APPROVED })
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
            .where('book.status = :status', { status: book_entity_2.BookStatus.PENDING })
            .orderBy('book.createDate', 'ASC');
        const [data, total] = await qb.getManyAndCount();
        return { data, total };
    }
    async changeStatus(id, dto) {
        const book = await this.bookRepository.findOne({ where: { id } });
        if (!book)
            throw new common_1.NotFoundException(`Книга с id ${id} не найдена`);
        book.status = dto.status;
        return this.bookRepository.save(book);
    }
    async findOne(id) {
        const book = await this.bookRepository.findOne({ where: { id } });
        if (!book)
            throw new common_1.NotFoundException(`книга с id ${id} не найдена`);
        return book;
    }
    async delete(id, userId) {
        const book = await this.bookRepository.findOne({
            where: { id },
            relations: { author: true }
        });
        if (!book)
            throw new common_1.NotFoundException(`Книга с id ${id} не найдена`);
        if (book?.author.id != userId)
            throw new common_1.ForbiddenException(`у вас нет прав`);
        await this.bookRepository.remove(book);
        return book;
    }
    async update(id, userId, dto) {
        const book = await this.bookRepository.findOne({
            where: { id },
            relations: { author: true }
        });
        if (!book)
            throw new common_1.NotFoundException(`Книга с id ${id} не найдена`);
        if (book.author.id != userId)
            throw new common_1.ForbiddenException(`У вас недостаточно прав`);
        await this.bookRepository.update(id, {
            title: dto.title,
            description: dto.description,
        });
        return await this.bookRepository.findOne({ where: { id } });
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        category_service_1.CategoryService])
], BookService);
//# sourceMappingURL=book.service.js.map