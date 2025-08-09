import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./entities/user.js";
import { ProductEntity } from "./entities/product.js";
import { CategoryEntity } from "./entities/category.js";
import { FileEntity } from "./entities/file.js";

export const AppDataSource = new DataSource({
    type: "sqlite", 
    database: "data/database.sqlite", 
    synchronize: true, 
    logging: false,
    entities: [UserEntity, ProductEntity, CategoryEntity, FileEntity], 
    migrations: [],
    subscribers: [],
});