import { Users } from "../../users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Orders {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'user_id', type: 'int', nullable: false})
    userId: number

    @Column({name: 'order_date', type: 'datetime', nullable: false})
    orderDate: string

    @Column({name: 'ship_address', type: 'varchar', nullable: false, length: 100})
    shipAddress: string

    @Column({name: 'ship_country', type: 'varchar', nullable: false, length: 32})
    shipCountry: string

    @Column({name: 'ship_city', type: 'varchar', nullable: false, length: 20})
    shipCity: string

    @Column({name: 'ship_postal_code', type: 'varchar', nullable: true, length: 10})
    shipPostalCode: string

    @ManyToOne(() => Users, users => users.orders)
    @JoinColumn({name: 'user_id'})
    users: Users

}
