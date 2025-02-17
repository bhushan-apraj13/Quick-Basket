import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import EditProducts from "./EditProducts";
import { ProductListFormSchema, ProductListSchema } from "@/schema/ProductList";

const productsList = [
    {
        title: "Chana Daal",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, quia! sefsrgdgdrgdfbdgsrgfsrsre",
        price: 100,
        image: "https://www.jiomart.com/images/product/original/490830935/tata-sampann-high-protein-unpolished-urad-dal-1-kg-product-images-o490830935-p590032714-0-202203170853.jpg?im=Resize=(1000,1000)",
    },
]

const AddProducts = () => {
    const [input, setInput] = useState<ProductListFormSchema>({
        title: "",
        description: "",
        price: 0,
        image: undefined
    });
    const loading = false;
    const [seletedProduct, setSelectedProduct] = useState<any>();
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<Partial<ProductListFormSchema>>({});
    const [editOpen, setEditOpen] = useState<boolean>(false);


    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === 'number' ? Number(value) : value });
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       const result = ProductListSchema.safeParse(input);
       if (!result.success) {
        const fieldErrors = result.error.formErrors.fieldErrors;
        setError(fieldErrors as Partial<ProductListFormSchema>);
        return;
       }
       console.log(input);
    };
    return (
        <div className="max-w-6xl mx-auto my-10 p-6 bg-white  rounded-lg">
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
                                    {
                                        error && <span className="text-xs font-medium text-error">{error.title}</span>
                                    }
                                </div>
                                <div className="flex flex-col">
                                    <Label className="mb-1.5 ml-1">Price (Rs)</Label>
                                    <Input type="number" name="price" placeholder="Enter product price" value={input.price} onChange={changeEventHandler} />
                                    {
                                        error && <span className="text-xs font-medium text-error">{error.price}</span>
                                    }
                                </div>
                                <div className="flex flex-col md:col-span-2">
                                    <Label className="mb-1.5 ml-1">Description</Label>
                                    <Input type="text" name="description" placeholder="Enter product description" value={input.description} onChange={changeEventHandler} />
                                    {
                                        error && <span className="text-xs font-medium text-error">{error.description}</span>
                                    }
                                </div>
                                <div className="flex flex-col md:col-span-2">
                                    <Label className="mb-1.5 ml-1">Upload Product Image</Label>
                                    <Input type="file" name="image" onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })} />
                                    {
                                        error && <span className="text-xs font-medium text-error">{error.image?.name || "*Product image is required"}</span>
                                    }
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
                {productsList.map((item: any, index: number) => (
                    <div key={index} className="relative flex flex-col md:flex-row items-start p-4 shadow-md rounded-lg border bg-white space-y-4 md:space-y-0 md:items-start">
                        <img src={item.image} alt={item.title} className="h-24 w-24 object-cover rounded-lg" />
                        <div className="flex-1 ml-4 flex flex-col justify-start">
                            <h1 className="text-lg font-semibold text-gray-800 text-start">{item.title}</h1>
                            <p className="text-sm text-gray-600 mt-1 text-start">{item.description}</p>
                            <h2 className="text-md font-semibold mt-2 text-start">Price: <span className="text-brandGreen">₹{item.price}</span></h2>
                        </div>
                        <Button onClick={() => { setSelectedProduct(item); setEditOpen(true); }} size="sm" className="absolute top-2 right-2 bg-brandGreen text-white hover:bg-brandGreen/80 w-15">Edit</Button>
                    </div>
                ))}
                <EditProducts selectedProduct={seletedProduct} editOpen={editOpen} setEditOpen={setEditOpen} />
            </div>

        </div>

    );
};

export default AddProducts;
