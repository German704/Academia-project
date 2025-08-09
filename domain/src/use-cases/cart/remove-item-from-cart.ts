import { CartService } from "../../services/cart-service.js";
import { UUID } from "../../types/types.js";

export interface RemoveItemFromCartPayload {
    userId: UUID;
    productId: UUID;
}

export interface RemoveItemFromCartDependencies {
    cartService: CartService;
}

export async function removeItemFromCart(
    { cartService }: RemoveItemFromCartDependencies,
    { userId, productId }: RemoveItemFromCartPayload
): Promise<void> {
    await cartService.removeItem(userId, productId);
}