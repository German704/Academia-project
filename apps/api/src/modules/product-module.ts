import { AuthServiceImplement } from "../services/auth-service-implement.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { Router } from "express";
import { DataSource } from "typeorm";
import { ProductEntity } from "../entities/product.js";
import { ProductServiceImplement } from "../services/product-service-implement.js";
import { CategoryServiceImplement } from "../services/category-service-implement.js";
import { CategoryEntity } from "../entities/category.js";
import { ProductController } from "../controllers/product-controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { UserEntity } from "../entities/user.js";
import { UserServiceImplement } from "../services/user-service-implement.js";

export const initializeProductModule = (dataSource: DataSource): Router => {
  const productRepository = dataSource.getRepository(ProductEntity);
  const CategoryRepository = dataSource.getRepository(CategoryEntity);
  const userRepository = dataSource.getRepository(UserEntity);
  const userService = new UserServiceImplement(userRepository);

  const productService = new ProductServiceImplement(productRepository);
  const categoryService = new CategoryServiceImplement(CategoryRepository);
  const authService = new AuthServiceImplement(userService);
  const authMiddlewareInstance = authMiddleware(authService);
  const adminMiddlewareInstance = adminMiddleware(authService);
  const productController = new ProductController(
    productService,
    categoryService
  );

  const productRouter = Router();

  const protectedRoutes = Router(); //rutas protegidas
  protectedRoutes.post(
    "/create",
    productController.createProduct.bind(productController)
  );

  productRouter.use(
    "/",
    authMiddlewareInstance,
    adminMiddlewareInstance,
    protectedRoutes
  );

  return productRouter;
};
