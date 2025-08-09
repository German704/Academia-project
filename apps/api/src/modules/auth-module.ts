import { DataSource } from "typeorm";
import { Router } from "express";

import { UserServiceImplement } from "../services/user-service-implement.js";
import { UserEntity } from "../entities/user.js";
import { AuthServiceImplement } from "../services/auth-service-implement.js";
import { AuthController } from "../controllers/auth-controller.js";

export const initializeAuthModule = (dataSource: DataSource): Router => {
    const userRepository = dataSource.getRepository(UserEntity);
    const userService = new UserServiceImplement(userRepository);
    const authService = new AuthServiceImplement()
    const authController = new AuthController(authService, userService);

    const userRouter = Router();
    userRouter.post("/Login", authController.login.bind(authController));

    return userRouter;
};