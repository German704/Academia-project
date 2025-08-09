import { CartService } from "../../services/cart-service.js";
import { UUID } from "../../types/types.js";

export interface ClearCartPayload {
    userId: UUID;
}

export interface ClearCartDependencies {
    cartService: CartService;
}

export async function clearCart(
    { cartService }: ClearCartDependencies,
    { userId }: ClearCartPayload
): Promise<void> {
    await cartService.clearCart(userId);
}