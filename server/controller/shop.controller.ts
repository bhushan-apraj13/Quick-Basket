import { Request, Response } from "express";
import { Shop } from "../models/shop.model";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { User } from "../models/user.model";
import { Order } from "../models/orders.model";

{/*for creating shop*/}
export const createShop = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Uploaded File:", req.file);
        const {storeName,city,address,deliveryTime,productCategory} = req.body;
        const file = req.file;


        const shop = await Shop.findOne({ userId: req.id });

        if (shop) {
            res.status(400).json({ success: false, message: "Shop already exists for this user" });
            return;
        }

        if (!file) {
            res.status(400).json({ success: false, message: "Please upload a product image" });
            return;
        }

        const storeBanner = await uploadImageOnCloudinary(file as Express.Multer.File);
        await Shop.create({
            userId: req.id,
            storeName,
            city,
            address,
            deliveryTime,
            productCategory:JSON.parse(productCategory),
            storeBanner,
        });
        res.status(201).json({ success: true, message: "Shop Added successfully" });
        return;

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

{/*for getting shop info*/}
export const getShop = async (req: Request, res: Response): Promise<void> => {
    try {
        const shop = await Shop.findOne({ userId: req.id }).populate('products');
        if (!shop) {
            res.status(404).json({ success: false, message: "Shop not found", shop:[] });
            return;
        };
        res.status(200).json({ success: true, shop });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

{/*for updating shop info*/}
export const updateShop = async (req: Request, res: Response): Promise<void> => {
    try {
        const {storeName,city,address,deliveryTime,productCategory} = req.body;
        const file = req.file;
        const shop = await Shop.findOne({ userId: req.id });
        if (!shop) {
            res.status(404).json({ success: false, message: "Shop not found" });
            return;
        };

        shop.storeName = storeName;
        shop.city = city;
        shop.address = address;
        shop.deliveryTime = deliveryTime;
        shop.productCategory = JSON.parse(productCategory);

        if (file) {
            const imageURL = await uploadImageOnCloudinary(file as Express.Multer.File);
            shop.storeBanner = imageURL;
        }
        

        await shop.save();
        res.status(200).json({ success: true, message: "Shop updated successfully",shop});
        return;
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

{/*for getting shop orders*/}
export const getShopOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const shop = await Shop.findOne({ userId: req.id });
        if (!shop) {
            res.status(404).json({ success: false, message: "Shop not found" });
            return;
        };
        const shopOrder = await Order.find({ shop: shop._id }).populate("shop").populate("user");

        res.status(200).json({ success: true, message: "Shop orders", shopOrder });
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

{/*for updating order status*/}
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const {orderId} = req.params;
        const {status} = req.body;
        const shopOrder = await Order.findById(orderId);
        if (!shopOrder) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        };
        shopOrder.status = status;
        await shopOrder.save();
        res.status(200).json({ success: true, message: "Order status updated",shopOrder});
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

{/*for searching */}
export const searchProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const searchText = req.params.searchText || req.query.searchText || "";
        const searchQuery = req.query.searchQuery as string || "";
        const selectedProducts = (req.query.selectedProducts as string || "")
            .split(",")
            .filter(productCategory => productCategory);

        //  Fetch user to determine their city
        const user = await User.findById(req.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;  
        }

        const userCity = user.city; // Get user's city

        //  Ensure shops are only from the user's city
        const query: any = { city: userCity };

        //  Apply search conditions
        if (searchText) {
            query.$or = [
                { Shopname: { $regex: searchText, $options: "i" } }, // Match shop name
            ];
        }

        if (searchQuery) {
            query.$or = [
                { Shopname: { $regex: searchQuery, $options: "i" } }, // Match shop name
                { productCategory: { $regex: searchQuery, $options: "i" } }, // Match product category
            ];
        }

        //  Apply product category filter if selected
        if (selectedProducts.length > 0) {
            query.productCategory = { $in: selectedProducts };
        }

        console.log(query);

        // Find shops matching the query
        const shops = await Shop.find(query);

        res.status(200).json({ success: true, data: shops });
        return; //  Optional but adds clarity
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        return; //  Ensures function stops in case of an error
    }
};



export const getSingleShop = async (req: Request, res: Response): Promise<void> => {
    try {
        const shopId = req.params.id;
        const shop = await Shop.findById(shopId).populate({path:'products', options:{createdAt:-1}
        });
        
        if (!shop) {
            res.status(404).json({ success: false, message: "Shop not found" });
            return; 
        }
        res.status(200).json(shop);
        return;   
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};