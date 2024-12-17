import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/Product.entities";

@Entity()
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    quantity: number

    @Column()
    deviceId: string

    @ManyToOne(() => Product, (product) => product.carts, { 
        onDelete: "CASCADE"
    })
    @JoinColumn()
    product: Product;
}