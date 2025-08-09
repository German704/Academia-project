import { Router, Request, Response, NextFunction } from "express";
import { uploadSingleFileMiddleware } from "./../middlewares/multer.middleware.js";
import { InvalidDataError, uploadFile, UploadFilePayload } from "app-domain";
import { FileServiceImplement } from "../services/file-service-implement.js";
import { ProductServiceImplement } from "../services/product-service-implement.js";

export class FileController {
  public router = Router();

  constructor(
    private fileService: FileServiceImplement,
    private productService: ProductServiceImplement
  ) {}

  async uploadFileHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.file) {
        throw new InvalidDataError({ file: "No file uploaded" });
      }

      const productId = req.params.id;
      if (!productId) {
        throw new InvalidDataError({ productId: "Product ID is required" });
      }

      const payload: UploadFilePayload = {
        file: req.file,
        productId: productId,
      };

      const response = await uploadFile(
        {
          fileService: this.fileService,
          productService: this.productService,
        },
        payload
      );

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
