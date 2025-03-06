import { ProductItem } from "@/types/shopTypes";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { useShopStore } from "@/zustand/useShopStore";
import { useCartstore } from "@/zustand/useCartstore";
import { useNavigate } from "react-router-dom";

const AvailableProducts = ({ products }: { products: ProductItem[] }) => {
    const { addToCart } = useCartstore();
    const { loading } = useShopStore();
    const navigate = useNavigate();

    return loading ? <AvailableProductsSkeleton /> : (
        <div className="md:p-2">
            <h1 className="text-xl md:text-2xl font-semibold mb-6 text-textPrimary">Available Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product: ProductItem) => (
                    <Card key={product._id} className="w-full max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden flex flex-col">
                        {/* Image - Prevents Cropping */}
                        <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain p-2"
                            />
                        </div>

                        {/* Product Info */}
                        <CardContent className="p-4 flex-grow flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white text-left line-clamp-2">
                                    {product.name}
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-left line-clamp-3">
                                    {product.description}
                                </p>
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 text-left mt-2">
                                    Net Qty: <span className="font-semibold">{product.netQty}</span>
                                </h3>
                            </div>

                            {/* Price - Adjusted Spacing */}
                            <h4 className="text-lg font-semibold text-left mt-3">
                                Price: <span className="text-brandGreen">₹{product.price}</span>
                            </h4>
                        </CardContent>

                        {/* Button Footer - Spacing Adjusted */}
                        <CardFooter className="p-4 pt-3">
                            <Button onClick={() => {
                                addToCart(product);
                                navigate("/cart");
                            }
                            } className="bg-brandGreen text-white hover:bg-brandGreen/80 w-full">
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AvailableProducts;



{/* Skeleton for available products */ }
const AvailableProductsSkeleton = () => {
    return (
        <div className="md:p-2">
            <h1 className="text-xl md:text-2xl font-semibold mb-6 text-textPrimary">
                Available Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="w-full max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden flex flex-col">
                        {/* Image Skeleton */}
                        <Skeleton className="w-full h-40" />

                        {/* Product Info Skeleton */}
                        <div className="p-4 flex-grow">
                            <Skeleton className="h-6 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-5/6 mb-4" />
                            <Skeleton className="h-6 w-1/2" />
                            <Skeleton className="h-4 w-1/3 mt-2" />
                        </div>

                        {/* Button Skeleton */}
                        <div className="p-4">
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
