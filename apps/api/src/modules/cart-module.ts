import { Router } from "express";
import { DataSource } from "typeorm";
import { CartEntity, CartItemEntity } from "../entities/cart.js";
import { ProductEntity } from "../entities/product.js";
import { UserEntity } from "../entities/user.js";
import { UserServiceImplement } from "../services/user-service-implement.js";
import { AuthServiceImplement } from "../services/auth-service-implement.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { CartController } from "../controllers/cart-controller.js";
import { CartServiceImplement } from "../services/cart-service-implement.js";
import { ProductServiceImplement } from "../services/product-service-implement.js";

export const initializeCartModule = (dataSource: DataSource): Router => {
  const cartRepository = dataSource.getRepository(CartEntity);
  const cartItemRepository = dataSource.getRepository(CartItemEntity);
  const productRepository = dataSource.getRepository(ProductEntity);
  const userRepository = dataSource.getRepository(UserEntity);
  const cartService = new CartServiceImplement(
    cartRepository,
    cartItemRepository,
    userRepository,
    productRepository
  );
  const productService = new ProductServiceImplement(productRepository);
  const userService = new UserServiceImplement(userRepository);
  const authService = new AuthServiceImplement(userService);
  const authMiddlewareInstance = authMiddleware(authService);
  const cartController = new CartController(cartService, productService);

  const cartRouter = Router();

  cartRouter.use("/", authMiddlewareInstance);

  cartRouter.get("/", cartController.getCart.bind(cartController));
  cartRouter.post("/items", cartController.addItem.bind(cartController));
  cartRouter.delete(
    "/items/:id",
    cartController.removeItem.bind(cartController)
  );
  cartRouter.delete("/", cartController.clearCart.bind(cartController));

  return cartRouter;
};
