// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
// import { Product } from "../product/Product.entities";
// import { Order } from "./Order.entities";

// @Entity()
// export class OrderDetail {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @ManyToOne(() => Product, (product) => product.orderDetails, { 
//         onDelete: "CASCADE"
//     })
//     @JoinColumn()
//     product: Product;
    
//     @ManyToOne(() => Order, (order) => order.orderDetails, { 
//         onDelete: "CASCADE"
//     })
//     @JoinColumn()
//     order: Order;
// }