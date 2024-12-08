import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    // @Column({ default: true })
    // isActive: boolean;

    // @OneToMany(() => OrderDetail, (orderdetail) => orderdetail.product, {
    //     onDelete: "CASCADE"
    // })
    // orderDetails: OrderDetail[]
}