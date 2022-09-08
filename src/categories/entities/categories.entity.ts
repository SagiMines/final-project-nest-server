import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'category_name', nullable: false,
        type: 'varchar', length: 50,
    })
    categoryName: string
}