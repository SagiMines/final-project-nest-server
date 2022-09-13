import { Products } from "../../products/entities/products.entity";
import { Users } from "../../users/entities/users.entity";
import { Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Wishlist {

    @PrimaryColumn({name: 'user_id', type: 'int', nullable: false })
    userId: number

    @PrimaryColumn({name: 'product_id', type: 'int', nullable: false })
    productId: number

    @ManyToOne(() => Users, users => users.wishlist)
    @JoinColumn({name: 'user_id'})
    users: Users

    @ManyToMany(() => Products, products => products.wishlist)
    @JoinColumn({name: 'product_id'})
    products: Products[]

}
