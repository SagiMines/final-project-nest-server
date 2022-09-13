import { Orders } from "../../orders/entities/order.entity"
import { Products } from "../../products/entities/products.entity"
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm"

@Entity()
export class OrderDetails {

    @PrimaryColumn({name: 'order_id', type: 'int', nullable: false})
    orderId: number

    @PrimaryColumn({name: 'product_id', type: 'int', nullable: false})
    productId: number

    @Column({name: 'unit_price', type: 'float', nullable: false})
    unitPrice: number

    @Column({type: 'tinyint', nullable: false})
    amount: number

    @Column({name: 'final_price', type: 'float', nullable: false})
    finalPrice: number

    @OneToOne(() => Orders, orders => orders.orderDetails, {onDelete: 'CASCADE',nullable: false})
    @JoinColumn({name: 'order_id'})
    orders: Orders

    @OneToOne(() => Products, products => products.orderDetails)
    @JoinColumn({name: 'product_id'})
    products: Products
}
