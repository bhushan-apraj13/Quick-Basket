import mongoose from "mongoose";

type DeliveryDetails = {
    email: string;
    name: string;
    address: string;
    city: string;
    contact: string;
}


type CartItems = {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    netQty: string;  
}

export interface IOrder extends mongoose.Document {
    user: mongoose.Schema.Types.ObjectId;
    shop: mongoose.Schema.Types.ObjectId;
    deliveryDetails: DeliveryDetails;
    cartItems: CartItems[];
    totalAmount: number;
    status: "pending" | "confirmed" | "preparing" | "outfordelivery" | "delivered";
}

const OrderSchema = new mongoose.Schema<IOrder>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: true,
    },
    deliveryDetails: {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true
            },
            netQty: {
                type: String,
                required: true
            },
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "preparing", "outfordelivery", "delivered"],
        required: true,
    },


}, { timestamps: true });

export const Order = mongoose.model("Order", OrderSchema);

