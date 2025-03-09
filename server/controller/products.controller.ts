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
        const shop = await Shop.findOne({ userId: req.id });
        if (!shop) {
            res.status(404).json({ success: false, message: "Shop not found" });
            return;
        }

        const defaultTitle = title.trim();
        const normalizedTitle = title.toLowerCase().trim().replace(/\s+/g, ""); 
        const normalizedNetQty = netQty.toLowerCase().trim().replace(/\s+/g, "");
        const defaultDescription = description.trim();
        
        const existingProduct = await Product.findOne({
            _id: { $in: shop.products }, 
            title: normalizedTitle, // ✅ Case-insensitive & space-normalized
            netQty: normalizedNetQty // ✅ Case-insensitive & space-normalized
        });
        if (existingProduct) {
            res.status(400).json({ success: false, message: "Product with same title and net quantity already exists in this shop" });
            return;
        }

        const imageURL = await uploadImageOnCloudinary(file as Express.Multer.File);

        const product: any = await Product.create({
            title: normalizedTitle,
            name: defaultTitle,
            description: defaultDescription,
            price,
            netQty: normalizedNetQty,  
            image: imageURL
        });

        shop.products.push(product._id);
        await shop.save();
       
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

        // ✅ Find the existing product
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        const shop = await Shop.findOne({ userId: req.id });
        if (!shop) {
            res.status(404).json({ success: false, message: "Shop not found" });
            return;
        }


        // ✅ Normalize `title` and `netQty` to maintain consistency
        const defaultTitle = title.trim();
        const normalizedTitle = title.toLowerCase().trim().replace(/\s+/g, ""); 
        const normalizedNetQty = netQty.toLowerCase().trim().replace(/\s+/g, "");
        const defaultDescription = description.trim();
        
        const existingProduct = await Product.findOne({
            _id: { $in: shop.products,  $ne: product._id }, 
            title: normalizedTitle, // ✅ Case-insensitive & space-normalized
            netQty: normalizedNetQty // ✅ Case-insensitive & space-normalized
        });
        if (existingProduct) {
            res.status(400).json({ success: false, message: "Product with same title and net quantity already exists in this shop" });
            return;
        }
        if (title) {
            product.title = normalizedTitle;
            product.name = defaultTitle;
        }
        if (description) product.description = defaultDescription;
        if (price) product.price = price;
        if (netQty) product.netQty = normalizedNetQty;

        // ✅ Upload new image if provided
        if (file) {
            const imageURL = await uploadImageOnCloudinary(file as Express.Multer.File);
            product.image = imageURL;
        }

        // ✅ Save updated product
        await product.save();

        res.status(200).json({ success: true, message: "Product updated successfully", product });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

export const removeProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        // ✅ Find the product
        const product:any = await Product.findById(id);
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        
        // ✅ Find the shop of the authenticated user
        const shop = await Shop.findOne({ userId: req.id });
        if (!shop) {
            res.status(404).json({ success: false, message: "Shop not found" });
            return;
        }
        
        // ✅ Ensure the product belongs to the shop
        if (!shop.products.some(prodId => prodId.toString() === product._id.toString())) {
            res.status(403).json({ success: false, message: "Unauthorized to update this product" });
            return;
        }
        
        // ✅ Set product as out of stock instead of deleting
        product.outOfStock = !product.outOfStock;
        await product.save();
        
        res.status(200).json({ success: true, message: product.outOfStock ? "Product set as Out of Stock" : "Product added Back in Stock", product });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};


