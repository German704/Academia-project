import { DataSource } from "typeorm";
import { Router } from "express";

import { AuthServiceImplement } from "../services/auth-service-implement.js";
import { FileServiceImplement } from "../services/file-service-implement.js";
import { FileEntity } from "../entities/file.js";
import { ProductServiceImplement } from "../services/product-service-implement.js";
import { ProductEntity } from "../entities/product.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { FileController } from "../controllers/file-controller.js";
import { uploadSingleFileMiddleware } from "../middlewares/multer.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { UserServiceImplement } from "../services/user-service-implement.js";
import { UserEntity } from "../entities/user.js";

export const initializeFileModule = (dataSource: DataSource): Router => {
  const fileRepository = dataSource.getRepository(FileEntity);
  const productRepository = dataSource.getRepository(ProductEntity);
  const userRepository = dataSource.getRepository(UserEntity);
  const userService = new UserServiceImplement(userRepository);
  const authService = new AuthServiceImplement(userService);
  const fileService = new FileServiceImplement(fileRepository);
  const productService = new ProductServiceImplement(productRepository);

  const authMiddlewareInstance = authMiddleware(authService);
  const adminMiddlewareInstance = adminMiddleware(authService);

  const fileController = new FileController(fileService, productService);

  const fileRouter = Router();
  fileRouter.post(
    "/:id/upload",
    authMiddlewareInstance,
    adminMiddlewareInstance,
    uploadSingleFileMiddleware("file"),
    fileController.uploadFileHandler.bind(fileController)
  );

  return fileRouter;
};
