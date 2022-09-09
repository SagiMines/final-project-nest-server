import { Categories } from "../../categories/entities/categories.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'category_id'})
    categoryId: number

    @ManyToOne(() => Categories, (category) => category.product, {onDelete: 'CASCADE',nullable: false})
    @JoinColumn({name: 'category_id' })
    category: Categories

    @Column({
        name: 'product_name', nullable: false,
        type: 'varchar', length: 100,
    })
    productName: string

    @Column({
        name: 'unit_price', nullable: true, type: 'float',
    })
    unitPrice: number

    @Column({
        name: 'units_in_stock', nullable: true, type: 'smallint',
    })
    unitsInStock: number

    @Column({
        nullable: true, type: 'varchar', length: 2500
    })
    description: string

    @Column({
        nullable: true, type: 'tinyint'
    })
    discount: number

    @Column({
        name: 'publish_date', nullable: true, type: 'datetime',
    })
    publishDate: string
}