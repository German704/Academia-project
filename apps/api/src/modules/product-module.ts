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
import { FileServiceImplement } from "../services/file-service-implement.js";
import { FileEntity } from "../entities/file.js";

export const initializeProductModule = (dataSource: DataSource): Router => {
  const productRepository = dataSource.getRepository(ProductEntity);
  const CategoryRepository = dataSource.getRepository(CategoryEntity);
  const fileRepository = dataSource.getRepository(FileEntity);
  const userRepository = dataSource.getRepository(UserEntity);
  const userService = new UserServiceImplement(userRepository);

  const productService = new ProductServiceImplement(productRepository);
  const categoryService = new CategoryServiceImplement(CategoryRepository);
  const fileService = new FileServiceImplement(fileRepository);
  const authService = new AuthServiceImplement(userService);
  const authMiddlewareInstance = authMiddleware(authService);
  const adminMiddlewareInstance = adminMiddleware(authService);
  const productController = new ProductController(
    productService,
    categoryService,
    fileService
  );

  const productRouter = Router();
  productRouter.get("/", productController.getProducts.bind(productController));
  productRouter.get("/:id", productController.getProductDetail.bind(productController));

  const protectedRoutes = Router();
  protectedRoutes.post(
    "/create",
    productController.createProduct.bind(productController)
  );
  protectedRoutes.put(
    "/update/:id",
    productController.updateProduct.bind(productController)
  );
  protectedRoutes.delete(
    "/delete/:id",
    productController.deleteProduct.bind(productController)
  );

  productRouter.use(
    "/",
    authMiddlewareInstance,
    adminMiddlewareInstance,
    protectedRoutes
  );

  return productRouter;
};
