import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import HeroImage from "@/assets/fast-shipping3.png";
import { Skeleton } from "./ui/skeleton";

const SearchPage = () => {
    const params = useParams();
    const [searchQuery, setSearchQuery] = useState<string>("");
    return (
        <div className="max-w-7xl mx-auto my-10 px-4">
            <div className="flex flex-col md:flex-row justify-between gap-10">
                <FilterPage />
                <div className="flex-1">
                    {/* Search Input Field */}
                    <div className="flex items-center gap-2 mb-6">
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Products"
                            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg"
                        />
                        <Button className="bg-brandOrange text-white hover:bg-opacity-90 px-6 py-2 rounded-lg">Search</Button>
                    </div>
                    {/* Searched Products */}
                    <div>
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
                            <h1 className="text-lg font-medium">(2) Search results found</h1>
                            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                                {
                                    ["Grocery & Kitchen", "Snacks & Drinks", "Personal Care"].map((item: string, index: number) => (
                                        <div key={index} className="relative inline-flex items-center max-w-full">
                                            <Badge className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap" variant="outline">{item}</Badge>
                                            <X className="absolute text-[#D19254] right-1 hover:cursor-pointer" size={16} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {/*Shop cards*/}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {
                                [1, 2, 3, 4, 5, 6].map((item: number, index: number) => (
                                    <Card key={index} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        <div className="relative">
                                            <AspectRatio ratio={16 / 9}>
                                                <img src={HeroImage} alt="" className="w-full h-full object-cover" />
                                            </AspectRatio>
                                            <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
                                                <span className="text-xs font-medium text-gray-500 dark:text-gray-300">Featured</span>
                                            </div>
                                        </div>
                                        <CardContent className="p-4">
                                            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Sharma General Store</h1>
                                            <div className="mt-2 flex items-center text-gray-600 dark:text-gray-400">
                                                <MapPin size={16} />
                                                <p className="text-sm ml-1">
                                                    City: <span className="font-medium">Mumbai</span>
                                                </p>
                                            </div>
                                            <div className="flex gap-2 mt-4 flex-wrap">
                                                {
                                                    ["Pulses & Legumes", "Spices & Masalas", "Flours & Grains"].map((item: string, index: number) => (
                                                        <Badge key={index} className="font-medium px-2 py-1 rounded-full shadow-sm" variant="outline">{item}</Badge>
                                                    ))
                                                }
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 flex justify-end">
                                            <Link to={`/shop/${123}`}>
                                                <Button className="bg-brandGreen text-white hover:bg-opacity-90 font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200">View Products</Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;

const SkeletonCard = () => {
    return (
        <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="relative">
                <AspectRatio ratio={16 / 9}>
                    <Skeleton className="w-full h-full" />
                </AspectRatio>
                <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
                    <Skeleton className="w-12 h-4" />
                </div>
            </div>
            <CardContent className="p-4">
                <Skeleton className="w-3/4 h-6 mb-2" />
                <div className="mt-2 flex items-center">
                    <MapPin size={16} className="text-gray-600 dark:text-gray-400" />
                    <Skeleton className="w-20 h-4 ml-2" />
                </div>
                <div className="flex gap-2 mt-4 flex-wrap">
                    <Skeleton className="w-16 h-6 rounded-full" />
                    <Skeleton className="w-16 h-6 rounded-full" />
                    <Skeleton className="w-16 h-6 rounded-full" />
                </div>
            </CardContent>
            <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 flex justify-end">
                <Skeleton className="w-32 h-10 rounded-lg" />
            </CardFooter>
        </Card>
    );
};


const NoResultFound = ({ searchText }: { searchText: string }) => {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
                No results found
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
                we couldn't find any products for "{searchText}".<br />Try searching for something else.
            </p>
            <Link to="/">
                <Button className="mt-4 bg-orange hover:bg-orangeHover">
                    Back to Home
                </Button>
            </Link>
        </div>
    );
};

