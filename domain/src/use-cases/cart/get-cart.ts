import { CartService } from "../../services/cart-service.js";
import { CartViewModel } from "../../types/cart.js";
import { UUID } from "../../types/types.js";

export interface GetCartPayload {
    userId: UUID;
}

export interface GetCartDependencies {
    cartService: CartService;
}

export async function getCart(
    { cartService }: GetCartDependencies,
    { userId }: GetCartPayload
): Promise<CartViewModel> {
    return cartService.getCartWithItems(userId);
}
