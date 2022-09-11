import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Products } from "../../products/entities/products.entity";


@Entity()
export class TopProducts {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'product_id', type: 'int', nullable: false })
    productId: number

    @OneToOne(() => Products, products => products.topProducts)
    @JoinColumn({name: 'product_id'})
    products: Products

}