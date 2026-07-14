import { User } from '../../user/entity/user.entity';
import { Category } from '../../category/entity/category.entity';
export declare enum BookStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare class Book {
    id: number;
    title: string;
    description?: string;
    author: User;
    categories: Category[];
    status: BookStatus;
    updateDate: Date;
    createDate: Date;
}
