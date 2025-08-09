import { FileMetadata, UUID } from "app-domain";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductEntity } from "./product.js";

@Entity()
export class FileEntity extends BaseEntity implements FileMetadata {
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;
  @Column({
    type: "varchar",
  })
  name!: string;

  @Column({ type: "varchar" })
  size!: number;

  @Column({
    type: "varchar",
  })
  type!: string;

  @Column({
    type: "text",
  })
  url!: string;

  @Column({ type: "varchar" })
  referenceId!: UUID;

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  @JoinColumn({ name: "referenceId" })
  product!: ProductEntity;
}
