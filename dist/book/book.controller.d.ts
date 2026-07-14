import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { BookFilterDto } from './dto/bookFilter.dto';
import { UpdateBookStatusDto } from './dto/update-status.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    create(dto: BookDto, req: any): Promise<import("./entity/book.entity").Book>;
    findAllPending(): Promise<{
        data: import("./entity/book.entity").Book[];
        total: number;
    }>;
    findOne(id: number): Promise<import("./entity/book.entity").Book | null>;
    findAll(query: BookFilterDto): Promise<{
        data: import("./entity/book.entity").Book[];
        total: number;
        page: number;
        limit: number;
    }>;
    remove(id: number, req: any): Promise<import("./entity/book.entity").Book>;
    update(dto: UpdateBookDto, id: number, req: any): Promise<import("./entity/book.entity").Book | null>;
    changeStatus(dto: UpdateBookStatusDto, id: number): Promise<import("./entity/book.entity").Book>;
}
