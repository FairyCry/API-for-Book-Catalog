import { Book } from '../../book/entity/book.entity';
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    books: Book[];
    role: UserRole;
}
