import mongoose from "mongoose";

export interface IProduct {
    title: string;
    name: string;
    price: number;
    description: string;
    image: string;
    netQty: string; // Added Net Quantity as a string (e.g., "1kg", "500gms")
}

export interface ProductDocument extends IProduct, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}  

const productSchema = new mongoose.Schema<ProductDocument>({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    netQty: {
        type: String,
        required: true, // Ensure net quantity is required
    }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
