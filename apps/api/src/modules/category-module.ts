import { Router } from "express";
import { DataSource } from "typeorm";
import { CategoryEntity } from "../entities/category.js";
import { CategoryServiceImplement } from "../services/category-service-implement.js";
import { AuthServiceImplement } from "../services/auth-service-implement.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { CategoryController } from "../controllers/category-controller.js";
import { UserEntity } from "../entities/user.js";
import { UserServiceImplement } from "../services/user-service-implement.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const initializeCategoryModule = (dataSource: DataSource): Router => {
    const CategoryRepository = dataSource.getRepository(CategoryEntity);
    const categoryService = new CategoryServiceImplement(CategoryRepository);
    const userRepository = dataSource.getRepository(UserEntity);
  const userService = new UserServiceImplement(userRepository);
const authService = new AuthServiceImplement(userService);
    const authMiddlewareInstance = authMiddleware(authService);
    const adminMiddlewareInstance = adminMiddleware(authService);
    const categoryController = new CategoryController(categoryService);

    const categoryRouter = Router(); 

    const protectedRoutes = Router(); //rutas protegidas
    protectedRoutes.post("/create", categoryController.createCategory.bind(categoryController));


    categoryRouter.use("/", authMiddlewareInstance, adminMiddlewareInstance, protectedRoutes);

    return categoryRouter;
};