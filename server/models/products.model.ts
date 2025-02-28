import mongoose from "mongoose";

export interface IProduct {
    //_id: mongoose.Schema.Types.ObjectId;
    title: string;
    price: number;
    description: string;
    image: string;
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
}, {timestamps: true});

export const Product =  mongoose.model("Product", productSchema);