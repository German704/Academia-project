import { DataSource } from "typeorm";
import { Router } from "express";

import { UserController } from "../controllers/user-controller.js";
import { UserServiceImplement } from "../services/user-service-implement.js";
import { UserEntity } from "../entities/user.js";
import { AuthServiceImplement } from "../services/auth-service-implement.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const initializeUserModule = (dataSource: DataSource): Router => {
    const userRepository = dataSource.getRepository(UserEntity);
    const userService = new UserServiceImplement(userRepository);
    const authService = new AuthServiceImplement()
    const authMiddlewareInstance = authMiddleware(authService);
    const userController = new UserController(userService, authService);

    const userRouter = Router();
    userRouter.post("/register", userController.registerUser.bind(userController));

    const protectedRoutes = Router();

    userRouter.use("/", authMiddlewareInstance, protectedRoutes);

    return userRouter;
};