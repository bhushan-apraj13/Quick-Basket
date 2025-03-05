import { Request, Response } from "express";
import { Shop } from "../models/shop.model";
import { Order } from "../models/orders.model";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CheckoutSessionRequest = {
    cartItems: {
        productId: string;
        name: string;
        image: string;
        price: number;
        quantity: number;
    }[],
    deliveryDetails: {
        name: string;
        email: string;
        adress: string;
        city: string;
    },
    shopId: string;

}

export const getOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find({ user: req.id }).populate('user').populate('shop');
        res.status(200).json({ success: true, orders});

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
};

export const createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;
        const shop = await Shop.findById(checkoutSessionRequest.shopId).populate('product');

        if (!shop) {
            res.status(404).json({ success: false, message: "Shop not found" });
            return;
        };

        const order: any = new Order({
            shop: shop._id,
            user: req.id,
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            status: "pending"
        });

        {/*line items*/ }
        const productItems = shop.products;
        const lineItems = createLineItems(checkoutSessionRequest, productItems);

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['GB', 'US', 'CA'],
            },
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/order/status`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
            metadata:{
                orderId: order._id.toString(),
                images: JSON.stringify(productItems.map((item:any) => item.image))
            }
        });
        if (!checkoutSession.url) {
            res.status(400).json({ success: false, message: "Failed to create checkout session" });
            return;
        }

        await order.save();
        res.status(200).json({ success: true, checkoutSession });
        return;

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};


export const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, productItems: any) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const productItem = productItems.find((item: { _id: string; }) => item._id === cartItem.productId);

        if (!productItem) throw new Error("Product item ID not found");

        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: productItem.name,
                    images: [productItem.image],
                },
                unit_amount: productItem.price * 100,
            },
            quantity: cartItem.quantity,
        }
    })

    return lineItems;
}