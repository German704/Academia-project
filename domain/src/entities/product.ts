import { UUID } from "../types/types.js";

export interface Product {
  id: UUID;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Category {
  id: UUID;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
