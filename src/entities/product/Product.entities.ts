import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "../cart/cart.entities";

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

    @Column({ nullable: true })
    group: string;


    @OneToMany(() => Cart, (cart) => cart.product, {
        onDelete: "CASCADE"
    })
    carts: Cart[]
}