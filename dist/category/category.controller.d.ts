import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(dto: CreateCategoryDto): Promise<import("./entity/category.entity").Category>;
    delete(id: number): Promise<import("./entity/category.entity").Category | null>;
    findAll(): Promise<import("./entity/category.entity").Category[]>;
}
