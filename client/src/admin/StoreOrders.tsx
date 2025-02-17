import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StoreOrders = () => {
    return (
        <div className="max-w-6xl mx-auto py-10 px-6">
            <h1 className="text-3xl font-extrabold text-textSecondary dark:text-white mb-10">
                Orders Overview
            </h1>
            <div className="space-y-8">
                {/* Orders Table */}
                <div className="flex flex-col md:flex-row items-start md:items-start justify-between bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border-gray-200 dark:border-gray-700 gap-6">
                    {/* Order Details */}
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-textSecondary dark:text-white">Orders</h2>

                        {/* Order No (Dynamic when using map function) */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            <span className="font-semibold">Order No: </span>
                            #123456 {/* Replace this dynamically */}
                        </p>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            <span className="font-semibold">Address: </span>
                            some address will come here
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            <span className="font-semibold">Total Amount: </span>
                            200
                        </p>
                    </div>

                    {/* Order Status Dropdown */}
                    <div className="w-full sm:w-[60%] md:w-[50%] lg:w-[40%]">
                        <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Order Status
                        </Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {["Pending", "Confirmed", "Preparing", "OutforDelivery", "Delivered"].map(
                                        (status: string, index: number) => (
                                            <SelectItem key={index} value={status.toLowerCase()}>
                                                {status}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default StoreOrders;