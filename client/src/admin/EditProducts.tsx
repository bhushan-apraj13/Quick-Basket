import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductListFormSchema, ProductListSchema } from "@/schema/ProductList";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";

const EditProducts = ({ selectedProduct, editOpen, setEditOpen }: { selectedProduct: ProductListFormSchema, editOpen: boolean, setEditOpen: Dispatch<SetStateAction<boolean>> }) => {

    const [input, setInput] = useState<ProductListFormSchema>({
        title: "",
        description: "",
        price: 0,
        image: undefined
    });

    const [error, setError] = useState<Partial<ProductListFormSchema>>({});
    const loading = false;

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


    useEffect(() => {
        setInput({
            title: selectedProduct?.title || "",
            description: selectedProduct?.description || "",
            price: selectedProduct?.price || 0,
            image: undefined
        });
    }, [selectedProduct])
    return (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Edit Product
                    </DialogTitle>
                    <DialogDescription>Update your product details</DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler} >
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
                                        error && <span className="text-xs font-medium text-error">{error.image?.name}</span>
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
    );
};

export default EditProducts;