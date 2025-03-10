import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Store, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import EditProducts from "./EditProducts";
import { ProductListFormSchema, ProductListSchema, } from "@/schema/ProductList";
import { useProductStore } from "@/zustand/useProductStore";
import { useShopStore } from "@/zustand/useShopStore";

const AddProducts = () => {
    const [input, setInput] = useState<ProductListFormSchema>({
        title: "",
        description: "",
        price: 0,
        image: undefined,
        netQty: "",
         _id: ""
    });
    const [unit, setUnit] = useState("kg");
    const [seletedProduct, setSelectedProduct] = useState<ProductListFormSchema | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<Partial<ProductListFormSchema>>({});
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const { loading, createProduct, markOutOfStock} = useProductStore();
    const { shop } = useShopStore();

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === 'number' ? Number(value) : value });
    };

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = ProductListSchema.safeParse({ ...input, netQty: input.netQty + unit });
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setError(fieldErrors as Partial<ProductListFormSchema>);
            return;
        }
        try {
            const formData = new FormData();
            formData.append("title", input.title);
            formData.append("description", input.description);
            formData.append("price", input.price.toString());
            formData.append("netQty", input.netQty + unit);
            if (input.image) {
                formData.append("image", input.image);
            }
            await createProduct(formData);
        } catch (error) {
            console.log(error);
        }
    };

    // If shop is null, display a message and button to create a store
    if (!shop) {
        return (
            <div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-lg flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="rounded-full bg-brandOrange/10 p-4 mb-4">
                    <Store className="h-12 w-12 text-brandOrange" />
                </div>
                <h1 className="font-extrabold text-2xl text-textPrimary mb-2">Create Your Store First</h1>
                <p className="text-gray-600 max-w-md mb-6">You need to set up your store before you can add products. Let's get started!</p>
                <Link to="/admin/store">
                    <Button className="bg-brandGreen hover:bg-brandGreen/80 text-white">
                        Create Your Store
                    </Button>
                </Link>
            </div>
        );
    }

    // If shop exists but has no products, display a message and button to add products
    if (shop.products && shop.products.length === 0) {
        return (
            <div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-lg flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="rounded-full bg-brandOrange/10 p-4 mb-4">
                    <ShoppingBag className="h-12 w-12 text-brandOrange" />
                </div>
                <h1 className="font-extrabold text-2xl text-textPrimary mb-2">Your Store Shelves Are Empty</h1>
                <p className="text-gray-600 max-w-md mb-6">Time to add your first product! Showcase what makes your store special.</p>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-brandGreen hover:bg-brandGreen/80 text-white flex items-center">
                            <Plus className="mr-2" /> Add Your First Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-6 space-y-4">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">Add New Product</DialogTitle>
                            <DialogDescription className="text-sm text-gray-500">Add products that will make your store stand out</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submitHandler} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <Label className="mb-1.5 ml-1">Product Name</Label>
                                    <Input type="text" name="title" placeholder="Enter product name" value={input.title} onChange={changeEventHandler} />
                                    {error.title && <span className="text-xs font-medium text-error">{error.title}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <Label className="mb-1.5 ml-1">Price (Rs)</Label>
                                    <Input type="number" name="price" placeholder="Enter product price" value={input.price} onChange={changeEventHandler} />
                                    {error.price && <span className="text-xs font-medium text-error">{error.price}</span>}
                                </div>
                                <div className="flex flex-col md:col-span-2">
                                    <Label className="mb-1.5 ml-1">Description</Label>
                                    <textarea
                                        name="description"
                                        placeholder="Enter product description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        className="border rounded-md p-2 h-20 max-h-40 overflow-y-auto resize-none bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                    {error.description && <span className="text-xs font-medium text-error">{error.description}</span>}
                                </div>
                                {/* Net Qty Input */}
                                <div className="flex flex-col md:col-span-2">
                                    <Label className="mb-1.5 ml-1">Net Quantity</Label>
                                    <div className="flex gap-2">
                                        <Input type="number" name="netQty" placeholder="Enter quantity" value={input.netQty} onChange={changeEventHandler} />
                                        <select name="unit" value={unit} onChange={(e) => setUnit(e.target.value)} className="border rounded-md p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                                        >
                                            <option value="kg">kg</option>
                                            <option value="gms">gms</option>
                                            <option value="ltr">ltr</option>
                                            <option value="ml">ml</option>
                                        </select>
                                    </div>
                                    {error.netQty && <span className="text-xs font-medium text-error">{error.netQty}</span>}
                                </div>
                                <div className="flex flex-col md:col-span-2">
                                    <Label className="mb-1.5 ml-1">Upload Product Image</Label>
                                    <Input type="file" accept=".png, .jpg, .jpeg"  name="image" onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })} />
                                    {error.image && <span className="text-xs font-medium text-error">{error.image?.name || "*Product image is required"}</span>}
                                </div>
                            </div>
                            <DialogFooter className="mt-5">
                                {loading ? (
                                    <Button disabled className="bg-brandGreen hover:bg-brandGreen/80 text-white flex items-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="bg-brandGreen hover:bg-brandGreen/90 text-white">Submit</Button>
                                )}
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    // If shop exists and has products, display the original UI
    return (
        <div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-extrabold text-2xl text-textPrimary">Available Products</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-brandOrange hover:bg-brandOrange/80 text-white flex items-center ">
                            <Plus className="" /> Add Products
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-6 space-y-4">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold">Add New Product</DialogTitle>
                            <DialogDescription className="text-sm text-gray-500">Add products that will make your store stand out</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submitHandler} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <Label className="mb-1.5 ml-1">Product Name</Label>
                                    <Input type="text" name="title" placeholder="Enter product name" value={input.title} onChange={changeEventHandler} />
                                    {error.title && <span className="text-xs font-medium text-error">{error.title}</span>}
                                </div>
                                <div className="flex flex-col">
                                    <Label className="mb-1.5 ml-1">Price (Rs)</Label>
                                    <Input type="number" name="price" placeholder="Enter product price" value={input.price} onChange={changeEventHandler} />
                                    {error.price && <span className="text-xs font-medium text-error">{error.price}</span>}
                                </div>
                                <div className="flex flex-col md:col-span-2">
                                    <Label className="mb-1.5 ml-1">Description</Label>
                                    <textarea
                                        name="description"
                                        placeholder="Enter product description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        className="border rounded-md p-2 h-20 max-h-40 overflow-y-auto resize-none bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                    {error.description && <span className="text-xs font-medium text-error">{error.description}</span>}
                                </div>
                                {/* Net Qty Input */}
                                <div className="flex flex-col md:col-span-2">
                                    <Label className="mb-1.5 ml-1">Net Quantity</Label>
                                    <div className="flex gap-2">
                                        <Input type="number" name="netQty" placeholder="Enter quantity" value={input.netQty} onChange={changeEventHandler} />
                                        <select name="unit" value={unit} onChange={(e) => setUnit(e.target.value)} className="border rounded-md p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                                        >
                                            <option value="kg">kg</option>
                                            <option value="gms">gms</option>
                                            <option value="ltr">ltr</option>
                                            <option value="ml">ml</option>
                                        </select>
                                    </div>
                                    {error.netQty && <span className="text-xs font-medium text-error">{error.netQty}</span>}
                                </div>
                                <div className="flex flex-col md:col-span-2">
                                    <Label className="mb-1.5 ml-1">Upload Product Image</Label>
                                    <Input type="file" accept=".png, .jpg, .jpeg"  name="image" onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })} />
                                    {error.image && <span className="text-xs font-medium text-error">{error.image?.name || "*Product image is required"}</span>}
                                </div>
                            </div>
                            <DialogFooter className="mt-5">
                                {loading ? (
                                    <Button disabled className="bg-brandGreen hover:bg-brandGreen/80 text-white flex items-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="bg-brandGreen hover:bg-brandGreen/90 text-white">Submit</Button>
                                )}
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="space-y-6">
                {shop.products.map((item: any, index: number) => (
                    <div key={index} className="relative flex flex-col md:flex-row items-start p-4 shadow-md rounded-lg border bg-white space-y-4 md:space-y-0 md:items-start">
                        <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded-lg" />
                        <div className="flex-1 ml-4 flex flex-col justify-start">
                            <h1 className="text-lg font-semibold text-gray-800 text-start">{item.name}</h1>
                            <p className="text-sm text-gray-600 mt-1 text-start max-w-xs md:max-w-sm line-clamp-2 break-words">
                                {item.description}
                            </p>
                            <h2 className="text-md font-semibold mt-2 text-start">Net Qty: <span className="text-gray-600">{item.netQty}</span></h2>
                            <h2 className="text-md font-semibold mt-2 text-start">Price: <span className="text-brandGreen">₹{item.price}</span></h2>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-2">
                            <Button onClick={() => {
                                const transformedItem = {
                                    ...item,
                                    title: item.name,
                                    _id: item._id
                                }; setSelectedProduct(transformedItem); setEditOpen(true);
                            }} size="sm" className="bg-brandGreen text-white hover:bg-brandGreen/80 px-6 py-4 rounded-md">Edit</Button>
                            <Button onClick={() => markOutOfStock(item._id)} size="sm" className={`px-6 py-4 rounded-md ${item.outOfStock ?  'bg-[#988675] hover:bg-[#B19774]':'bg-red-500 hover:bg-red-600'} text-white`}>
                                {item.outOfStock ? "Re-Stock" : "Out of Stock"}
                            </Button>
                        </div>
                    </div>
                ))}
                <EditProducts selectedProduct={seletedProduct} editOpen={editOpen} setEditOpen={setEditOpen} />
            </div>
        </div>
    );
};

export default AddProducts;