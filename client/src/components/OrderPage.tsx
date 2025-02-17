import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const OrderPage = () => {
    const orders = [1, 2, 3];
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-background px-4 relative">
            {orders.length === 0 ? (
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-2xl text-textPrimary dark:text-gray-300">
                        No Orders Found
                    </h1>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 max-w-lg w-full mt-[-80px]">
                    
                    {/* Order Status Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-extrabold text-textPrimary dark:text-gray-300">
                            Order Status:{" "}
                            <span className="text-brandGreen">CONFIRMED</span>
                        </h1>
                    </div>
    
                    {/* Order Summary Section */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
                            Order Summary
                        </h2>
    
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center justify-between">
                                {/* Product Image & Name */}
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src="https://www.jiomart.com/images/product/original/490830935/tata-sampann-high-protein-unpolished-urad-dal-1-kg-product-images-o490830935-p590032714-0-202203170853.jpg?im=Resize=(1000,1000)" 
                                        alt="Chana Daal" 
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        Chana Daal
                                    </h3>
                                </div>
    
                                {/* Price Section */}
                                <div className="flex items-center space-x-1 text-gray-800 dark:text-gray-200">
                                    <IndianRupee className="h-5 w-5" />
                                    <span className="text-lg font-semibold">200</span>
                                </div>
                            </div>
                            <Separator />
                        </div>
                    </div>
    
                    {/* Order Total */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                            Total Amount:
                        </h2>
                        <div className="flex items-center space-x-1 text-gray-800 dark:text-gray-200">
                            <IndianRupee className="h-5 w-5" />
                            <span className="text-lg font-semibold">200</span>
                        </div>
                    </div>
    
                    {/* Continue Shopping Button */}
                    <Link to="/">
                        <Button className="bg-brandGreen text-white hover:bg-brandGreen/80 w-full py-3 rounded-lg shadow-md">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
    
    
    
};

export default OrderPage;