import { Products } from "../../products/entities/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'category_name', nullable: false,
        type: 'varchar', length: 50,
    })
    categoryName: string

    @OneToMany(() => Products, (product) => product.category)
    product: Products[]
}