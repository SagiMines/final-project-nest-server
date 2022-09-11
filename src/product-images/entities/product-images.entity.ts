import { Products } from "../../products/entities/products.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductImages {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'product_id', nullable: false, type: 'int'})
    productId: number

    @Column({name: 'image_src', nullable: true, type: 'varchar', length: 1000})
    imageSrc: string

    @ManyToOne(() => Products, product => product.image, {onDelete: 'CASCADE',nullable: false})
    @JoinColumn({name: 'product_id'})
    product: Products
}