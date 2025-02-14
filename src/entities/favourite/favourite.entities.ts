import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/Product.entities";

@Entity()
export class Favourite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.favourites, { 
        onDelete: "CASCADE",
        nullable: false
    })
    @JoinColumn()
    product: Product;

    @Column()
    deviceId: string;
}
