import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "@/assets/shopImage1.jpg";
import { Skeleton } from "./ui/skeleton";

const AvailableProducts = () => {
    return (
        <div className="md:p-2">
            <h1 className="text-xl md:text-2xl font-semibold mb-6 text-textPrimary">Available Products</h1>
            <div className="grid md:grid-cols-3 gap-4">
                <Card className="md:max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
                    <img src="https://www.jiomart.com/images/product/original/490830935/tata-sampann-high-protein-unpolished-urad-dal-1-kg-product-images-o490830935-p590032714-0-202203170853.jpg?im=Resize=(1000,1000)"alt="" className="w-full h-40 object-cover"/>
                    <CardContent className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-left">
                            Chana Daal
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-left">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                        <h3 className="text-lg font-semibold mt-4 text-left">
                            Price: <span className="text-brandGreen">₹100</span>
                        </h3>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 text-left">
                            Quantity: <span className="font-semibold">1kg</span>
                        </h4>
                    </CardContent>
                    <CardFooter className="p-4">
                        <Button className="bg-brandGreen text-white hover:bg-brandGreen/80 w-full">
                            Add to Cart
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default AvailableProducts;



{/* Skeleton for available products */}
const AvailableProductsSkeleton = () => {
    return (
        <div className="md:p-2">
            <h1 className="text-xl md:text-2xl font-semibold mb-6 text-textPrimary">Available Products</h1>
            <div className="grid md:grid-cols-3 gap-4">
                <Card className="md:max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
                    <Skeleton className="w-full h-40" />
                    <CardContent className="p-4">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <Skeleton className="h-6 w-1/3 mb-2" />
                        <Skeleton className="h-4 w-1/4" />
                    </CardContent>
                    <CardFooter className="p-4">
                        <Button disabled className="w-full">
                            Add to Cart
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};
