import { beforeEach, describe, expect, test } from "vitest";
import { CartItem, cartItemMock, cartMock, productMock } from "../../entities";
import { UUID } from "../../types";
import { getCart, GetCartDependencies, GetCartPayload } from "./get-cart";
import { cartServiceMock, MockedCartService, MockedProductService, productServiceMock } from "../../services";

describe("getCart", () => {
    let mockCartService: MockedCartService;
  let mockProductService: MockedProductService;
  const testUserId = "user-1" as UUID;
  const testProductId1 = "product-1" as UUID;

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
  test("debería obtener un carrito con sus ítems", async () => {
    const initialItems: CartItem[] = [
      cartItemMock({
        id: "item-1" as UUID,
        cartId: "cart-1" as UUID,
        productId: testProductId1,
        quantity: 2,
      }),
    ];
    mockCartService.items = initialItems;

    const dependencies: GetCartDependencies = { cartService: mockCartService };
    const payload: GetCartPayload = { userId: testUserId };

    const result = await getCart(dependencies, payload);

    expect(result.userId).toBe(testUserId);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].productId).toBe(testProductId1);
  });
});
