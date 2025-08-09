import { Cart, CartItem } from "../entities/cart.js";

export interface CartViewModel extends Cart { items: CartItem[] }