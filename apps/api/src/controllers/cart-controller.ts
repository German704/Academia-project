import { NextFunction, Request, Response } from "express";
import { CartServiceImplement } from "../services/cart-service-implement.js";
import { addItemToCart, AddItemToCartDependencies, AddItemToCartPayload, clearCart, ClearCartDependencies, ClearCartPayload, getCart, GetCartDependencies, getCartItems, GetCartItemsDependencies, GetCartItemsPayload, GetCartPayload, NotFoundError, removeItemFromCart, RemoveItemFromCartDependencies, RemoveItemFromCartPayload } from "app-domain";
import { UUID } from "crypto";
import { ProductServiceImplement } from "../services/product-service-implement.js";

export class CartController {
    constructor(private cartService: CartServiceImplement, private productService: ProductServiceImplement) {}

    public getCart = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id as UUID;
            const payload: GetCartPayload = { userId };
            const dependencies: GetCartDependencies = { cartService: this.cartService };

            const cartWithItems = await getCart(dependencies, payload);
            res.status(200).json(cartWithItems);
        } catch (error) {
            next(error);
        }
    };
    public getCartItems = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id as UUID;
            const payload: GetCartItemsPayload = { userId };
            const dependencies: GetCartItemsDependencies = { cartService: this.cartService };

            const cartWithItems = await getCartItems(dependencies, payload);
            res.status(200).json(cartWithItems);
        } catch (error) {
            next(error);
        }
    };

    public addItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id as UUID;
            const { productId, quantity } = req.body;
            const payload: AddItemToCartPayload = { userId, productId: productId as UUID, quantity };
            const dependencies: AddItemToCartDependencies = { cartService: this.cartService, productService: this.productService };

            await addItemToCart(dependencies, payload);
            res.status(201).json({ message: "Product successfully added to your cart" });
        } catch (error) {
            if (error instanceof NotFoundError) {
                return res.status(404).json({ message: error.message });
            }
            next(error);
        }
    };

    public removeItem = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id as UUID;
            const { productId } = req.params;
            const payload: RemoveItemFromCartPayload = { userId, productId: productId as UUID };
            const dependencies: RemoveItemFromCartDependencies = { cartService: this.cartService };

            await removeItemFromCart(dependencies, payload);
            res.status(200).json({ message: "Producto eliminado del carrito correctamente." });
        } catch (error) {
            next(error);
        }
    };

    public clearCart = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId =  req.user?.id as UUID;
            const payload: ClearCartPayload = { userId };
            const dependencies: ClearCartDependencies = { cartService: this.cartService };

            await clearCart(dependencies, payload);
            res.status(200).json({ message: "Carrito vaciado correctamente." });
        } catch (error) {
            next(error);
        }
    };
}