import { createCategory, CreateCategoryPayload } from "app-domain";
import { Request, Response, Router } from "express";
import { CategoryServiceImplement } from "../services/category-service-implement.js";

export class CategoryController {
  public router = Router();

  constructor(private categoryService: CategoryServiceImplement) {}

  async createCategory(req: Request, res: Response): Promise<void> {
    const payload: CreateCategoryPayload = req.body;
    const newUser = await createCategory(
      { categoryService: this.categoryService },
      payload
    );
    res.status(201).json(newUser);
  }
}
