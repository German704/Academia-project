import { DataSource } from "typeorm";
import { Router } from "express";

import { initializeUserModule } from "../modules/user-module.js";
import { initializeFileModule } from "../modules/file-module.js";
import { initializeProductModule } from "../modules/product-module.js";
import { initializeCategoryModule } from "../modules/category-module.js";

export const initializeAppModules = (dataSource: DataSource): Router => {
    const mainRouter = Router();

    mainRouter.use("/users", initializeUserModule(dataSource));
    mainRouter.use("/upload", initializeFileModule(dataSource));
    mainRouter.use("/categories", initializeCategoryModule(dataSource));
    mainRouter.use("/products", initializeProductModule(dataSource));

    return mainRouter;
};