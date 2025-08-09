import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source.js";
import { initializeAppModules } from "./routes/container.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";

AppDataSource.initialize().then(() => {
    const app = express();
    const port = 3000;

    app.use(express.json());

    const appRouter = initializeAppModules(AppDataSource);

    app.use("/api", appRouter);

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    });
}).catch(error => console.log(error));

