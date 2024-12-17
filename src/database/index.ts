import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "../entities/product/Product.entities";
import { Cart } from "../entities/cart/cart.entities";


const AppDataSource = new DataSource({
    type: "postgres",
    username: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 5432,
    entities: [Product, Cart],
    synchronize: true,
});

module.exports = AppDataSource;