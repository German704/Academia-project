import { Category, UUID } from "app-domain";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class CategoryEntity extends BaseEntity implements Category {
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;
  @Column({
    type: "varchar",
  })
  name!: string;

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;
  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;
}
