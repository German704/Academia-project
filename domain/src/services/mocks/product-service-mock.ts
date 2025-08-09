import { FileMetadata, Product } from "../../entities/index.js";
import { ProductViewModel } from "../../types/index.js";
import { ProductService } from "../product-service.js";

export interface MockedProductService extends ProductService {
  products: Product[];
}

export function productServiceMock(
  products: Product[] = [],
  files: FileMetadata[] = []
): MockedProductService {
  return {
    products: [...products],
    async save(product) {
      const newProduct: Product = {
        ...product,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.products.push(newProduct);
      return newProduct;
    },
    async update(product) {
      const updateProduct: Product = {
        ...product,
        updatedAt: new Date(),
      };
      const index = this.products.findIndex((item) => item.id === product.id);
      this.products.splice(index, 1, updateProduct);

      return product;
    },
    async getAll() {
      const productsList: ProductViewModel[] = this.products
        .map(({ id, category, name, description, price, stock }) => {
          const images = files.filter((file) => file.referenceId === id);
          return {
            id,
            name,
            description,
            category,
            images,
            price,
            stock,
          };
        })
      return productsList;
    },
    async findById(id) {
        const product = this.products.find(product => product.id === id)
        
        return  product || null;
    },
    async findByIdWithImage(id) {
        const product = this.products.find(product => product.id === id)
        if(!product) return null;
        const images = files.filter((file) => file.referenceId === id);
        
        return {
            ...product,
            images,
        }
    },
    async delete(id) {
        this.products = this.products.filter((product) => product.id != id);
    },
  };
}
