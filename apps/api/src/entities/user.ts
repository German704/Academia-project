import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { User, UserRole, UUID } from "app-domain";

@Entity()
export class UserEntity extends BaseEntity implements User {

    @PrimaryGeneratedColumn("uuid")
    id!: UUID;

    @Column({
        type: "varchar"
    })
    name!: string;

    @Column({
        type: "varchar"
    })
    surname!: string;

    @Column({
        type: "text",
    })
    role!: UserRole;
    
    @Column({ type: "varchar", unique: true }) 
    email!: string;

    @Column({
        type: "varchar"
    })
    password!: string;
    
    @CreateDateColumn({type: "date"})
    createdAt!: Date;

    @UpdateDateColumn({type: "date"}) 
    updatedAt!: Date;
}