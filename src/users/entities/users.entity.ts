import { Wishlist } from "../../wishlist/entities/wishlist.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders} from "../../orders/entities/order.entity";
import { Cart } from "../../cart/entities/cart.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'first_name', nullable: false,
        type: 'varchar', length: 50,
    })
    firstName: string

    @Column({
        name: 'last_name', nullable: false,
        type: 'varchar', length: 50,
    })
    lastName: string

    @Column({
        nullable: true, type: 'varchar', length: 100,
    })
    address: string

    @Column({
        nullable: false, type: 'varchar', length: 32,
    })
    country: string

    @Column({
        nullable: true, type: 'varchar', length: 20,
    })
    city: string

    @Column({
        name: 'postal_code', nullable: true, type: 'varchar', length: 10,
    })
    postalCode: string

    @Column({
        nullable: true, type: 'varchar', length: 24,
    })
    phone: string

    @Column({
        nullable: false, type: 'varchar', length: 50,
    })
    email: string

    @Column({
        nullable: false, type: 'varchar', length: 250,
    })
    password: string

    @OneToMany(() => Wishlist, wishlist => wishlist.users)
    wishlist: Wishlist[]

    @OneToMany(() => Orders, orders => orders.users)
    orders: Orders[]

    @OneToMany(() => Cart, cart => cart.users)
    cart: Cart
}