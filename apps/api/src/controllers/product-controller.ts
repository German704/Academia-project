import { Router, Request, Response } from "express";

import {
    createProduct,
    CreateProductPayload,
} from "app-domain";
import { ProductServiceImplement } from "../services/product-service-implement.js";
import { CategoryServiceImplement } from "../services/category-service-implement.js";

export class ProductController {
    public router = Router();

    constructor(private productService: ProductServiceImplement, private categoryService: CategoryServiceImplement) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post("/create", this.createProduct.bind(this));
        // this.router.get("/update/:id", this.updateProduct.bind(this));
        // this.router.get("/", this.getProducts.bind(this));
        // this.router.get("/:id", this.getProductDetail.bind(this));
        // this.router.put("/delete/:id", this.deleteProduct.bind(this));
    }
    
    async createProduct(req: Request, res: Response): Promise<void> {
        const payload: CreateProductPayload = req.body;
        const newUser = await createProduct({ productService: this.productService, categoryService: this.categoryService }, payload);
        res.status(201).json(newUser);
    }
}