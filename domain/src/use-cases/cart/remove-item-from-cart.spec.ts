import { beforeEach, describe, expect, it } from "vitest";
import { UUID } from "../../types";
import { removeItemFromCart, RemoveItemFromCartDependencies, RemoveItemFromCartPayload } from "./remove-item-from-cart";
import { cartServiceMock, MockedCartService, MockedProductService, productServiceMock } from "../../services";
import { CartItem, cartItemMock, cartMock, productMock } from "../../entities";

describe("removeItemFromCart", () => {
  let mockCartService: MockedCartService;
  let mockProductService: MockedProductService;
  const testUserId = "user-1" as UUID;
  const testProductId1 = "product-1" as UUID;
  const testProductId2 = "product-2" as UUID;

  beforeEach(() => {
    mockCartService = cartServiceMock(
      [
        cartMock({
          id: "cart-1" as UUID,
          userId: testUserId,
        }),
      ],
      []
    );
    mockProductService = productServiceMock([
      productMock({ id: testProductId1 }),
    ]);
  });
  it("Should remove a product from cart", async () => {
    const initialItems: CartItem[] = [
      cartItemMock({
        id: "item-1" as UUID,
        cartId: "cart-1" as UUID,
        productId: testProductId1,
        quantity: 2,
      }),
      cartItemMock({
        id: "item-2" as UUID,
        cartId: "cart-1" as UUID,
        productId: testProductId2,
        quantity: 1,
      }),
    ];
    mockCartService.items = initialItems;

    const dependencies: RemoveItemFromCartDependencies = {
      cartService: mockCartService,
    };
    const payload: RemoveItemFromCartPayload = {
      userId: testUserId,
      productId: testProductId1,
    };

    await removeItemFromCart(dependencies, payload);

    const { items } = await mockCartService.getCartWithItems(testUserId);
    expect(items).toHaveLength(1);
    expect(items[0].productId).toBe(testProductId2);
  });
});
