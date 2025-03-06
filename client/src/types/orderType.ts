export type CheckoutSessionRequest = {
    cartItems: {
        productId: string;
        name: string;
        image: string;
        price: string;
        quantity: string;
    }[];
    deliveryDetails: {
        name: string;
        email: string;
        address: string;
        city: string;
        contact: string;
    };
    shopId: string;
}

export interface orderItem extends CheckoutSessionRequest {
    _id: string;
    status: string;
    totalAmount: number;
}

export type OrderState = {
    loading: boolean;
    orders: orderItem[];
    createCheckoutSession: (CheckoutSessionRequest:CheckoutSessionRequest)=>Promise<void>;
    getOrders: () => Promise<void>;

}