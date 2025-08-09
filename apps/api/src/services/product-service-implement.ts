import { Product, ProductService, ProductViewModel, UUID } from "app-domain";
import { Repository } from "typeorm";
import { NotFoundError } from "app-domain";
import { ProductEntity } from "../entities/product.js";

export class ProductServiceImplement implements ProductService {
  constructor(private ProductRepository: Repository<ProductEntity>) {}

  async findById(id: string): Promise<Product | null> {
    const product = await this.ProductRepository.findOneBy({ id: id as UUID });
    return product;
  }

  async getAll(): Promise<ProductViewModel[]> {
    const products = await this.ProductRepository.find({
      relations: ["images"],
    });
    return products.map((product) => ({
      ...product,
    }));
  }
  async findByIdWithImage(id: string): Promise<ProductViewModel | null> {
    const product = await this.ProductRepository.findOne({
      where: { id: id as UUID },
      relations: ["images"],
    });
    return product || null;
  }
  async save(
    product: Omit<Product, "createdAt" | "updatedAt">
  ): Promise<Product> {
    const newProduct = await this.ProductRepository.save({
      ...product,
    });
    return newProduct;
  }
  async update(product: Product): Promise<Product> {
    const existingProduct = await this.ProductRepository.findOneBy({ id: product.id });
    if (!existingProduct) {
      throw new NotFoundError({ product: "Product not found" });
    }

    this.ProductRepository.merge(existingProduct, product);

    const updatedProduct = await this.ProductRepository.save(existingProduct);
    return updatedProduct;
  }
  async delete(id: string): Promise<void> {
    const result = await this.ProductRepository.delete({ id: id as UUID });
    if (result.affected === 0) {
        throw new NotFoundError({ product: "Product not found" });
    }
}
}
