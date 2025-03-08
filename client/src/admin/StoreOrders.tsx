import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useShopStore } from "@/zustand/useShopStore";
import { Loader2, PackageX } from "lucide-react";
import { useEffect } from "react";

const StoreOrders = () => {
    const { getShopOrders, updateShopOrders, shopOrders, loading } = useShopStore();

    useEffect(() => {
        getShopOrders();
    }, []);

    const handleStatusChange = async (orderId: string, status: string) => {
        await updateShopOrders(orderId, status);
    };

    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-bold text-textPrimary text-center mb-8">Orders Overview</h1>
            
            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-10 h-10 text-brandGreen animate-spin" />
                </div>
            )}

            {/* No Orders Found */}
            {!loading && shopOrders.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <PackageX className="w-16 h-16 text-gray-400" />
                    <p className="text-gray-500 text-lg mt-4">No orders found. Looks like it's time to get selling! 🚀</p>
                </div>
            )}

            {/* Orders List */}
            {!loading && shopOrders.length > 0 && (
                <div className="space-y-6">
                    {shopOrders.map((order) => (
                        <Card key={order._id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                            <CardContent className="flex flex-col md:flex-row justify-between items-start gap-6">
                                {/* Order Details */}
                                <div className="flex-1 space-y-2 text-left">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">Order ID: </span> {order._id}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">Customer: </span> {order.deliveryDetails.name}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 w-60 break-words">
                                        <span className="font-medium">Address: </span> {order.deliveryDetails.address}, {order.deliveryDetails.city}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">Ordered Items: </span>
                                    </p>
                                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                                        {order.cartItems.map((item, index) => (
                                            <li key={index}>{item.name} (x{item.quantity})</li>
                                        ))}
                                    </ul>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        <span className="font-medium">Total Amount: </span> ₹{order.totalAmount}
                                    </p>
                                </div>

                                {/* Order Status Dropdown */}
                                <div className="w-full md:w-1/4 lg:w-1/5 text-center">
                                    <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Order Status
                                    </Label>
                                    <Select onValueChange={(newStatus) => handleStatusChange(order._id, newStatus)} defaultValue={order.status}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {["Pending", "Confirmed", "Preparing", "OutforDelivery", "Delivered"].map((status, index) => (
                                                    <SelectItem key={index} value={status.toLowerCase()}>
                                                        {status}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};


export default StoreOrders;