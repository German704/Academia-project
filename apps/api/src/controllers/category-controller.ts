import { createCategory, CreateCategoryPayload } from "app-domain";
import { Request, Response, Router } from "express";
import { CategoryServiceImplement } from "../services/category-service-implement.js";

export class CategoryController {
    public router = Router();

    constructor(private categoryService: CategoryServiceImplement) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/create", this.createCategory.bind(this));
        // this.router.get("/update/:id", this.updateProduct.bind(this));
        // this.router.get("/", this.getProducts.bind(this));
        // this.router.get("/:id", this.getProductDetail.bind(this));
        // this.router.put("/delete/:id", this.deleteProduct.bind(this));
    }
    
    async createCategory(req: Request, res: Response): Promise<void> {
        const payload: CreateCategoryPayload = req.body;
        const newUser = await createCategory({ categoryService: this.categoryService }, payload);
        res.status(201).json(newUser);
    }
}