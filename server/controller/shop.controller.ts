import { Request, Response } from "express";
import { Shop } from "../models/shop.model";
import uploadImageOnCloudinary from "../utils/imageUpload";
import { User } from "../models/user.model";
import { Order } from "../models/orders.model";

{/*for creating shop*/}
export const createShop = async (req: Request, res: Response): Promise<void> => {
    try {
        const {storeName,city,address,deliveryTime,productCategory} = req.body;
        const file = req.file;


        const shop = await Shop.findOne({ userId: req.id });

        if (shop) {
            res.status(400).json({ success: false, message: "Shop already exists for this user" });
            return;
        }

        if (!file) {
            res.status(400).json({ success: false, message: "Please upload a image for store Banner" });
            return;
        }

        const defaultName = storeName.trim();
        const processedStoreName = storeName.toLowerCase().trim().replace(/\s+/g, "");
        const defaultCityName = city.trim();
        const processedCityName = city.toLowerCase().trim().replace(/\s+/g, "");
        const defaultAddress = address.trim();
        const defaultDeliveryTime = deliveryTime.trim();

        const storeBanner = await uploadImageOnCloudinary(file as Express.Multer.File);
        await Shop.create({
            userId: req.id,
            storeName: processedStoreName,
            name: defaultName,
            city: processedCityName,
            cityName: defaultCityName,
            address: defaultAddress,
            deliveryTime: defaultDeliveryTime,
            productCategory:JSON.parse(productCategory),
            storeBanner,
        });
        res.status(201).json({ success: true, message: "Shop Added successfully" });
        return;

        
    } catch (error) {
        console.error("Error creating shop:", error); 
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};

{/*for getting shop info*/}
export const getShop = async (req: Request, res: Response): Promise<void> => {
    try {
        const shop = await Shop.findOne({ userId: req.id }).populate('products');
        // const shop = await Shop.findOne({ userId: req.id }).populate({
        //     path: "products",
        //     match: { outOfStock: { $ne: true } }, // ✅ Exclude out-of-stock products
        // });
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

        const defaultName = storeName.trim();
        const processedStoreName = storeName.toLowerCase().trim().replace(/\s+/g, "");
        const defaultCityName = city.trim();
        const processedCityName = city.toLowerCase().trim().replace(/\s+/g, "");
        const defaultAddress = address.trim();
        const defaultDeliveryTime = deliveryTime.trim();

        shop.storeName = processedStoreName;
        shop.name = defaultName;
        shop.city = processedCityName;
        shop.cityName = defaultCityName;
        shop.address = defaultAddress;
        shop.deliveryTime = defaultDeliveryTime;

        shop.productCategory = JSON.parse(productCategory);

        if (file) {
            const imageURL = await uploadImageOnCloudinary(file as Express.Multer.File);
            shop.storeBanner = imageURL;
        }
        

        await shop.save();
        res.status(200).json({ success: true, message: "Shop updated successfully",shop});
        return;
        
    } catch (error:any) {
        res.status(500).json({ message: "Please make sure all the fields are filled correctly" });
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
        const shopOrder = await Order.find({ shop: shop._id }).populate("shop").populate("user").sort({ createdAt: -1 });

        res.status(200).json({ success: true, shopOrder });
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
        res.status(200).json({ success: true, message: "Order status updated",status: shopOrder.status });
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
        const searchText = req.params.searchText.trim()|| "";
        const searchQuery = req.query.searchQuery as String|| "";
        //  Fetch user to determine their city
        const user = await User.findById(req.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;  
        }

        const userCity = user.city.toLowerCase().trim().replace(/\s+/g, ""); // Get user's city

        const shops = await Shop.aggregate([
            { $match: { city: userCity } }, // Filter by user's city
            {
                $lookup: {
                    from: "products",
                    localField: "products",
                    foreignField: "_id",
                    as: "products",
                },
            },
            {
                $match: {
                    // "products.outOfStock": { $ne: true },   
                    $or: [
                        { name: { $regex: searchText, $options: "i" } },
                        { storeName: { $regex: searchText, $options: "i" } },
                        { "products.title": { $regex: searchText, $options: "i" } },
                        { "products.name": { $regex: searchText, $options: "i" } },
                        { productCategory: { $regex: searchText, $options: "i" } },
                        { name: { $regex: searchQuery, $options: "i" } },
                        { storeName: { $regex: searchQuery, $options: "i" } }, 
                        { "products.title": { $regex: searchQuery, $options: "i" } }, 
                        { "products.name": { $regex: searchQuery, $options: "i" } },
                        { productCategory: { $regex: searchQuery, $options: "i" } },
                    ],
                },
            },
        ]);


        res.status(200).json({ success: true, data: shops });
        return; //  Optional but adds clarity
    } catch (error:any) {
        console.error(error);
        res.status(500).json({ message: error.message });
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
        res.status(200).json({success:true,shop});
        return;   
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};