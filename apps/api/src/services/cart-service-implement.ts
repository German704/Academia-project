import { CartItem, CartService, CartViewModel, Product, ProductService, ProductViewModel, UUID } from "app-domain";
import { Repository } from "typeorm";
import { NotFoundError } from "app-domain";
import { ProductEntity } from "../entities/product.js";
import { CartEntity, CartItemEntity } from "../entities/cart.js";
import { UserEntity } from "../entities/user.js";

export class CartServiceImplement implements CartService {
    constructor(
        private cartRepository: Repository<CartEntity>,
        private cartItemRepository: Repository<CartItemEntity>,
        private userRepository: Repository<UserEntity>,
        private productRepository: Repository<ProductEntity>,
    ) {}

    async getCart(userId: string): Promise<CartEntity> {
        let cart = await this.cartRepository.findOne({
            where: { user: { id: userId as UUID} },
            relations: ["user"],
        });

        if (!cart) {
            const user = await this.userRepository.findOne({ where: { id: userId as UUID} });
            if (!user) {
                throw new NotFoundError({user: "User not found"});
            }

            cart = this.cartRepository.create({
                user: user,
            });
            await this.cartRepository.save(cart);
        }

        return cart;
    }

    async getCartWithItems(userId: string): Promise<CartViewModel> {
        const cart = await this.cartRepository.findOne({
            where: { user: { id: userId as UUID} },
            relations: ["items"],
        });

        if (!cart) {
            throw new NotFoundError({cart: "Cart not found"});
        }

        return cart;
    }

    async addItem(userId: string, productId: string, quantity: number): Promise<void> {
        const cart = await this.getCart(userId);

        const product = await this.productRepository.findOne({ where: { id: productId as UUID } });
        if (!product) {
            throw new NotFoundError({product: "Product not found"});
        }

        let cartItem = await this.cartItemRepository.findOne({
            where: {
                cart: { id: cart.id },
                product: { id: productId as UUID},
            },
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await this.cartItemRepository.save(cartItem);
        } else {
            cartItem = this.cartItemRepository.create({
                cart: cart,
                product: product,
                quantity: quantity,
            });
            await this.cartItemRepository.save(cartItem);
        }
    }
    async removeItem(userId: UUID, productId: UUID): Promise<void> {
        const cart = await this.getCart(userId);
        
        const cartItem = await this.cartItemRepository.findOne({
            where: {
                cart: { id: cart.id },
                product: { id: productId },
            },
        });

        if (cartItem) {
            await this.cartItemRepository.remove(cartItem);
        }
    }
    async clearCart(userId: UUID): Promise<void> {
        const cart = await this.getCart(userId);
        
        const cartItems = await this.cartItemRepository.find({
            where: { cart: { id: cart.id } },
        });

        if (cartItems.length > 0) {
            await this.cartItemRepository.remove(cartItems);
        }
    }

    async getCartItems(userId: string): Promise<CartItem[]> {
        const cartItems = await this.cartItemRepository.find({where: {cart: {userId: userId as UUID}}})
        return cartItems
    }
}

