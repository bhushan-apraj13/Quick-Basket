import Image from "@/assets/shopImage1.jpg";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import AvailableProducts from "./AvailableProducts";

const ShopDetails = () => {
    return (
        <div className="max-w-6xl mx-auto my-10 px-4">
            {/* Shop Name - Above the Image */}
            <h1 className="text-2xl font-extrabold text-textPrimary text-start mb-3">
                Sharma General Store
            </h1>

            {/* Shop Banner */}
            <div className="relative w-full h-36 md:h-64 lg:h-72">
                <img 
                    src={Image} 
                    alt="Shop Image" 
                    className="object-cover w-full h-full rounded-lg shadow-md"
                />
            </div>

            {/* Shop Information - Badges & Delivery Time in the Same Row */}
            <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                {/* Category Badges */}
                <div className="flex flex-wrap gap-2">
                    {["Pulses & Legumes", "Spices & Masalas", "Flours & Grains"].map((item, index) => (
                        <Badge 
                            key={index} 
                            className="font-medium px-2 py-1 rounded-full shadow-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
                            variant="outline"
                        >
                            {item}
                        </Badge>
                    ))}
                </div>

                {/* Delivery Time - Right Aligned */}
                <div className="flex items-center gap-2 mt-3 md:mt-0">
                    <Timer className="w-5 h-5 text-brandGreen" />
                    <h1 className="text-base font-medium text-textPrimary">
                        Delivery Time: <span className="text-textSecondary">15 mins</span>
                    </h1>
                </div>
            </div>

            {/* Available Products Section */}
            <div className="mt-8">
                <AvailableProducts />
            </div>
        </div>
    );
};

export default ShopDetails;
