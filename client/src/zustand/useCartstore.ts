import { CartState } from "@/types/CartType";
import { ProductItem } from "@/types/shopTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


export const useCartstore = create<CartState>()(persist((set) => ({
    cartItems: [],
    addToCart: (product: ProductItem) => {
        set((state) => {
            const existingProduct = state.cartItems.find((cartItem) => cartItem._id === product._id);

            if (existingProduct) {
                return {
                    cartItems: state.cartItems.map((cartItem) => cartItem._id === product._id ? { ...cartItem, quantity: Math.min(cartItem.quantity + 1, 10) } : cartItem)
                };
            }
            else {
                // ADd new product
                return {
                    cartItems: [...state.cartItems, { ...product, quantity: 1 }]
                }
            }
        });
    },

    clearCart: () => {
        set({ cartItems: [] });
    },

    removeFromCart: (productId: string) => {
        set((state) => ({
            cartItems: state.cartItems.filter((cartItem) => cartItem._id !== productId)
        })
        )
    },
    increMentQuantity: (productId: string) => {
        set((state) => ({
            cartItems: state.cartItems.map((cartItem) => cartItem._id === productId ? { ...cartItem, quantity: Math.min(cartItem.quantity + 1, 10)} : cartItem)
        }))
    },
    decreMentQuantity: (productId: string) => {
        set((state) => ({
            cartItems: state.cartItems.map((cartItem) => cartItem._id === productId && cartItem.quantity > 1 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
        }))
    },
}),
    {
        name: 'cart-name',
        storage: createJSONStorage(() => localStorage),
    }
))
