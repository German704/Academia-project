import { beforeEach, describe, expect, test } from "vitest";
import { CartItem, cartItemMock, cartMock, productMock } from "../../entities";
import { UUID } from "crypto";
import { clearCart, ClearCartDependencies, ClearCartPayload } from "./clear-cart";
import {
  cartServiceMock,
  MockedCartService,
  MockedProductService,
  productServiceMock,
} from "../../services";

describe("clearCart", () => {
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
  test("Should clear the cart", async () => {
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

    const dependencies: ClearCartDependencies = {
      cartService: mockCartService,
    };
    const payload: ClearCartPayload = { userId: testUserId };

    await clearCart(dependencies, payload);

    const { items } = await mockCartService.getCartWithItems(testUserId);
    expect(items).toHaveLength(0);
  });
});
