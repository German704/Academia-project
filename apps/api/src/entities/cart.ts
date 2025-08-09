import { Cart, CartItem, UUID } from "app-domain";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.js";
import { ProductEntity } from "./product.js";

@Entity()
export class CartEntity extends BaseEntity implements Cart {
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;

  @Column({
    type: "varchar",
  })
  name!: string;

  @Column({
    type: "varchar",
  })
  userId!: UUID;

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;
  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
  items!: CartItemEntity[];

  @OneToOne(() => UserEntity, (user) => user.cart)
  @JoinColumn()
    user!: UserEntity;
}

@Entity()
export class CartItemEntity extends BaseEntity implements CartItem {
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;

  @Column({
    type: "varchar",
  })
  productId!: UUID;

  @Column({
    type: "varchar",
  })
  quantity!: number;

  @Column({
    type: "varchar",
  })
  cartId!: UUID;

  @CreateDateColumn({ type: "date" })
  createdAt!: Date;
  @UpdateDateColumn({ type: "date" })
  updatedAt!: Date;

   @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: "productId" })
    product!: ProductEntity;

  @ManyToOne(() => CartEntity, (cart) => cart.items)
  @JoinColumn({ name: "cartId" })
  cart!: CartEntity;
}
