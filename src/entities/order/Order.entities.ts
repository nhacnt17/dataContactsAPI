// import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
// import { OrderDetail } from "./OrderDetail.entities";
// import { User } from "../User.entities";

// @Entity()
// export class Order {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column({ unique: true })
//     date: Date;

//     @Column()
//     status: string;

//     @Column()
//     total: number;
    
//     @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
//         onDelete: "CASCADE"
//     })
//     orderDetails: OrderDetail[]

//     @ManyToOne(() => User, (user) => user.orders, { 
//         onDelete: "CASCADE"
//     })
//     @JoinColumn()
//     user: User
// }