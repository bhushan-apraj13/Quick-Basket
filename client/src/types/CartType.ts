import { ProductItem } from "./shopTypes";

 export interface CartItem extends ProductItem {
    quantity: number;

}

export type CartState = {
    cartItems: CartItem[];
    addToCart: (product: ProductItem) => void;
    clearCart: () => void;
    removeFromCart: (productId: string) => void;
    increMentQuantity: (productId: string) => void;
    decreMentQuantity: (productId: string) => void;
}