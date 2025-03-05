import mongoose from "mongoose";

export interface IShop {
    userId: mongoose.Types.ObjectId;
    storeName: string;
    name: string;
    description: string;
    city: string;
    cityName: string;
    address: string;
    deliveryTime: Number;
    productCategory: string;
    storeBanner: string;
    products: mongoose.Schema.Types.ObjectId[]
}

export interface ShopDocument extends IShop, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const shopSchema = new mongoose.Schema<ShopDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    storeBanner: {
        type: String,

    },
    city: {
        type: String,
        required: true,
    },
    cityName:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    deliveryTime: {
        type: Number,
        required: true,
    },
    productCategory: [{type: String, required: true}],
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],

},{timestamps: true});


export const Shop =  mongoose.model("Shop", shopSchema);