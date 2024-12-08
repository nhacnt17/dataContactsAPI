// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
// import { Order } from "../order/Order.entities";

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string;

//     @Column({ unique: true })
//     email: string;

//     @Column()
//     password: string;

//     @Column({ default: true })
//     isActive: boolean;

//     @OneToMany(() => Order, (Order) => Order.user, {
//         onDelete: "CASCADE"
//     })
//     orders: Order[]

// }