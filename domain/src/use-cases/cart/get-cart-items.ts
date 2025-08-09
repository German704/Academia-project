import { CartItem } from "../../entities/cart.js";
import { CartService } from "../../services/cart-service.js";
import { CartViewModel } from "../../types/cart.js";
import { UUID } from "../../types/types.js";

export interface GetCartItemsPayload {
    userId: UUID;
}

export interface GetCartItemsDependencies {
    cartService: CartService;
}

export async function getCartItems(
    { cartService }: GetCartItemsDependencies,
    { userId }: GetCartItemsPayload
): Promise<CartItem[]> {
    return cartService.getCartItems(userId);
}
