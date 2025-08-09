import { beforeEach, describe, expect, test } from "vitest";
import {
  addItemToCart,
  AddItemToCartDependencies,
  AddItemToCartPayload,
} from "./add-item-to-cart";
import {
  cartServiceMock,
  MockedCartService,
  MockedProductService,
  productServiceMock,
} from "../../services";
import { UUID } from "../../types";
import { CartItem, cartItemMock, cartMock, productMock } from "../../entities";
import { NotFoundError } from "../../errors/errors";

describe("addItemToCart", () => {
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
  test("Should add a product on cart if it don't exist", async () => {
    const dependencies: AddItemToCartDependencies = {
      cartService: mockCartService,
      productService: mockProductService,
    };
    const payload: AddItemToCartPayload = {
      userId: testUserId,
      productId: testProductId1,
      quantity: 1,
    };

    await addItemToCart(dependencies, payload);

    const { items } = await mockCartService.getCartWithItems(testUserId);
    expect(items).toHaveLength(1);
    expect(items[0].productId).toBe(testProductId1);
    expect(items[0].quantity).toBe(1);
  });

  test("Should update quantity if the product exist in the cart", async () => {
    const initialItems: CartItem[] = [
      cartItemMock({
        id: "item-1" as UUID,
        cartId: "cart-1" as UUID,
        productId: testProductId1,
        quantity: 2,
      }),
    ];
    mockCartService.items = initialItems;

    const dependencies: AddItemToCartDependencies = {
      cartService: mockCartService,
      productService: mockProductService,
    };
    const payload: AddItemToCartPayload = {
      userId: testUserId,
      productId: testProductId1,
      quantity: 3,
    };

    await addItemToCart(dependencies, payload);

    const { items } = await mockCartService.getCartWithItems(testUserId);
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(5);
  });

  test("Should fail with NotFoundError if the product non exist", async () => {
    const dependencies: AddItemToCartDependencies = {
      cartService: mockCartService,
      productService: mockProductService,
    };
    const payload: AddItemToCartPayload = {
      userId: testUserId,
      productId: "invalid-product-id" as UUID,
      quantity: 1,
    };

    await expect(addItemToCart(dependencies, payload)).rejects.toThrow(
      NotFoundError
    );
    await expect(addItemToCart(dependencies, payload)).rejects.toHaveProperty(
      "context.product",
      "Product not found"
    );
  });
});
