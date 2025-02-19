import mongoose from "mongoose";

export interface Product {
    //_id: mongoose.Schema.Types.ObjectId;
    name: string;
    price: number;
    description: string;
    imageURL: string;
}

export interface ProductDocument extends Product, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}  

const productSchema = new mongoose.Schema<ProductDocument>({
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
    imageURL: {
        type: String,
        required: true,
    },
}, {timestamps: true});

export const Product =  mongoose.model("Product", productSchema);