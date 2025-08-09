import { Cart, CartItem } from "../../entities/index.js";
import { CartService } from "../cart-service.js";
import { CartViewModel, UUID } from "../../types/index.js";


export interface MockedCartService extends CartService {
  carts: Cart[];
  items: CartItem[];
}

export function cartServiceMock(initialCarts: Cart[] = [], initialItems: CartItem[] = []): MockedCartService {
  return {
    carts: [...initialCarts],
    items: [...initialItems],

    async getCart(userId: string): Promise<Cart> {
      let cart = this.carts.find(c => c.userId === userId);

      if (!cart) {
        cart = {
          id: crypto.randomUUID(),
          userId: userId as UUID,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        this.carts.push(cart);
      }

      return cart;
    },

    async addItem(userId: string, productId: string, quantity: number): Promise<void> {
      const cart = await this.getCart(userId);

      const existingItem = this.items.find(
        (item) => item.cartId === cart.id && item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.updatedAt = new Date();
      } else {
        this.items.push({
          id: crypto.randomUUID(),
          cartId: cart.id,
          productId: productId as UUID,
          quantity,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      cart.updatedAt = new Date();
    },

    async removeItem(userId: string, productId: string): Promise<void> {
      const cart = await this.getCart(userId);
      this.items = this.items.filter(
        (item) => !(item.cartId === cart.id && item.productId === productId)
      );
      cart.updatedAt = new Date();
    },

    async clearCart(userId: string): Promise<void> {
      const cart = await this.getCart(userId);
      this.items = this.items.filter((item) => item.cartId !== cart.id);
      cart.updatedAt = new Date();
    },

    async getCartItems(userId: string): Promise<CartItem[]> {
      const cart = await this.getCart(userId);
      return this.items.filter((item) => item.cartId === cart.id);
    },
    async getCartWithItems(userId: string): Promise<CartViewModel> {
      const cart = await this.getCart(userId);
      const items = this.items.filter((item) => item.cartId === cart.id);

      return {
        ...cart,
        items
      }
    },
  };
}
