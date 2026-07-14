import { Book } from './entity/book.entity';
import { Repository } from 'typeorm';
import { BookDto } from './dto/book.dto';
import { BookFilterDto } from './dto/bookFilter.dto';
import { CategoryService } from '../category/category.service';
import { UpdateBookStatusDto } from './dto/update-status.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookService {
    private readonly bookRepository;
    private readonly categoryService;
    constructor(bookRepository: Repository<Book>, categoryService: CategoryService);
    create(dto: BookDto, userId: number): Promise<Book>;
    findAll(query: BookFilterDto): Promise<{
        data: Book[];
        total: number;
        page: number;
        limit: number;
    }>;
    findAllPending(): Promise<{
        data: Book[];
        total: number;
    }>;
    changeStatus(id: number, dto: UpdateBookStatusDto): Promise<Book>;
    findOne(id: number): Promise<Book | null>;
    delete(id: number, userId: number): Promise<Book>;
    update(id: number, userId: number, dto: UpdateBookDto): Promise<Book | null>;
}
