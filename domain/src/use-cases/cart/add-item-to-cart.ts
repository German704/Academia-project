import { NotFoundError } from "../../errors/errors.js";
import { CartService } from "../../services/cart-service.js";
import { ProductService } from "../../services/product-service.js";
import { UUID } from "../../types/types.js";

export interface AddItemToCartPayload {
    userId: UUID;
    productId: UUID;
    quantity: number;
}

export interface AddItemToCartDependencies {
    cartService: CartService;
    productService: ProductService;
}

export async function addItemToCart(
    { cartService, productService }: AddItemToCartDependencies,
    { userId, productId, quantity }: AddItemToCartPayload
): Promise<void> {
    const product = await productService.findById(productId);
    if (!product) {
        throw new NotFoundError({product: "Product not found"});
    }
    
    await cartService.addItem(userId, productId, quantity);
}