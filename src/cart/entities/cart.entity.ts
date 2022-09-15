import { Products } from "../../products/entities/products.entity";
import { Users } from "../../users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryColumn({name: 'user_id', type: 'int', nullable: false})
    userId: number

    @PrimaryColumn({name: 'product_id', type: 'int', nullable: false})
    productId: number

    @Column({type: 'tinyint', nullable: false})
    amount: number

    @ManyToOne(() => Users, users => users.cart)
    @JoinColumn({name: 'user_id'})
    users: Users

    @ManyToMany(() => Products, products => products.cart)
    @JoinColumn({name: 'product_id'})
    products: Products[]
}
