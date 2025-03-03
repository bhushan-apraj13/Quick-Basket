import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { Product } from "../models/products.model";
import { Shop } from "../models/shop.model";
import mongoose from "mongoose";

export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, price, netQty } = req.body;
        const file = req.file;
        if (!file) {
            res.status(400).json({ success: false, message: "No file uploaded" });
            return;
        }

        if (!netQty) {
            res.status(400).json({ success: false, message: "Net Quantity is required" });
            return;
        }

        const imageURL = await uploadImageOnCloudinary(file as Express.Multer.File);

        const product: any = await Product.create({
            title,
            description,
            price,
            netQty,  // Added netQty field
            image: imageURL
        });
        const shop = await Shop.findOne({ userId: req.id });
        if (shop) {
            (shop.products as mongoose.Schema.Types.ObjectId[]).push(product._id);
            await shop.save();
        }
        res.status(201).json({ success: true, message: "Product added successfully", product });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

export const editProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, price, netQty } = req.body;
        const file = req.file;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        if (title) product.title = title;
        if (description) product.description = description;
        if (price) product.price = price;
        if (netQty) product.netQty = netQty; // Update netQty
        if (file) {
            const imageURL = await uploadImageOnCloudinary(file as Express.Multer.File);
            product.image = imageURL;
        }
        await product.save();
        res.status(200).json({ success: true, message: "Product updated successfully", product });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};
