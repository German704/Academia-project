import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany, OneToOne } from "typeorm";
import { Product, UUID } from "app-domain";
import { FileEntity } from "./file.js";

@Entity()
export class ProductEntity extends BaseEntity implements Product {

    @PrimaryGeneratedColumn("uuid")
    id!: UUID;

    @Column({
        type: "varchar"
    })
    name!: string;

    @Column({
        type: "varchar"
    })
    description!: string;

    @Column({
        type: "varchar",
    })
    price!: number;
    
    @Column({ type: "varchar" }) 
    stock!: number;

    @Column({
        type: "varchar"
    })
    category!: string;
    
    @CreateDateColumn({type: "date"})
    createdAt!: Date;

    @UpdateDateColumn({type: "date"}) 
    updatedAt!: Date;

    @OneToMany(() => FileEntity, file => file.product)
    images!: FileEntity[];
}