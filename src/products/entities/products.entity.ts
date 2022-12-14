import { Categories } from "../../categories/entities/categories.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductImages } from "../../product-images/entities/product-images.entity";
import { TopProducts } from "../../top-products/entities/top-product.entity";
import { Wishlist } from "../../wishlist/entities/wishlist.entity";
import { OrderDetails } from "../../order-details/entities/order-detail.entity";
import { Cart } from "../../cart/entities/cart.entity";

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'category_id', nullable: false, type: 'int'})
    categoryId: number

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

    @ManyToOne(() => Categories, (category) => category.product, {onDelete: 'CASCADE',nullable: false})
    @JoinColumn({name: 'category_id' })
    category: Categories

    @OneToMany(() => ProductImages, productImages => productImages.product)
    productImages: ProductImages[]

    @OneToOne(() => TopProducts, topProducts => topProducts.products)
    topProducts: TopProducts

    @ManyToMany(() => Wishlist, wishlist => wishlist.products)
    wishlist: Wishlist[]

    @OneToOne(() => OrderDetails, orderDetails => orderDetails.products)
    orderDetails: OrderDetails

    @ManyToMany(() => Cart, cart => cart.products)
    cart: Cart[]

}
