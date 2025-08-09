import { Router, Request, Response } from "express";

import {
  createProduct,
  CreateProductPayload,
  deleteProduct,
  DeleteProductPayload,
  getProductDetail,
  getProductDetailPayload,
  getProducts,
  updateProduct,
  UpdateProductPayload,
} from "app-domain";
import { ProductServiceImplement } from "../services/product-service-implement.js";
import { CategoryServiceImplement } from "../services/category-service-implement.js";
import { FileServiceImplement } from "../services/file-service-implement.js";

export class ProductController {
  public router = Router();

  constructor(
    private productService: ProductServiceImplement,
    private categoryService: CategoryServiceImplement,
    private fileService: FileServiceImplement
  ) {}

  async createProduct(req: Request, res: Response): Promise<void> {
    const payload: CreateProductPayload = req.body;
    const result = await createProduct(
      {
        productService: this.productService,
        categoryService: this.categoryService,
      },
      payload
    );
    res.status(201).json(result);
  }
  async updateProduct(req: Request, res: Response): Promise<void> {
    const payload: UpdateProductPayload = {
      ...req.body,
      id: req.params.id,
    };
    const result = await updateProduct(
      {
        productService: this.productService,
        categoryService: this.categoryService,
      },
      payload
    );
    res.status(201).json(result);
  }
  async getProductDetail(req: Request, res: Response): Promise<void> {
    const payload: getProductDetailPayload = {
      id: req.params.id,
    };
    const result = await getProductDetail(
      { productService: this.productService },
      payload
    );
    res.status(201).json(result);
  }
  async getProducts(req: Request, res: Response): Promise<void> {
    const result = await getProducts({ productService: this.productService });
    res.status(201).json(result);
  }
  async deleteProduct(req: Request, res: Response): Promise<void> {
    const payload: DeleteProductPayload = { id: req.params.id };
    const result = await deleteProduct(
      {
        productService: this.productService,
        fileMetadataService: this.fileService,
      },
      payload
    );
    res.status(201).json(result);
  }
}
