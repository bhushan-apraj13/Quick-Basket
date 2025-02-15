import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StoreInfoSchema, storeSchema } from "@/schema/storeSchema";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Store = () => {
    const [input, setInput] = useState<StoreInfoSchema>({
        storeName: "",
        address: "",
        city: "",
        deliveryTime: 0,
        products: [],
        storeBanner: undefined,
    });

    const [errors, setErrors] = useState<Partial<StoreInfoSchema>>({});

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === 'number' ? Number(value) : value });
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = storeSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<StoreInfoSchema>);
            return;
        }
        console.log(input);
    };

    const loading = false;
    const storeExists = true;
    
    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-lg">
            <h1 className="font-extrabold text-3xl text-textPrimary mb-8 text-center">
                {storeExists ? "Update Store" : "Add New Store"}
            </h1>
            
            <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                    <Label className="text-left ml-1">Store Name</Label>
                    <Input type="text" name="storeName" placeholder="Enter store name"
                        value={input.storeName} onChange={changeEventHandler} />
                    {errors.storeName && <span className="text-xs text-error font-medium text-left ml-1">{errors.storeName}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label className="text-left ml-1">Address</Label>
                    <Input type="text" name="address" placeholder="Enter store address"
                        value={input.address} onChange={changeEventHandler} />
                    {errors.address && <span className="text-xs text-error font-medium text-left ml-1">{errors.address}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label className="text-left ml-1">City</Label>
                    <Input type="text" name="city" placeholder="Enter city"
                        value={input.city} onChange={changeEventHandler} />
                    {errors.city && <span className="text-xs text-error font-medium text-left ml-1">{errors.city}</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <Label className="text-left ml-1">Delivery Time (mins)</Label>
                    <Input type="number" name="deliveryTime" placeholder="Estimated delivery time"
                        value={input.deliveryTime} onChange={changeEventHandler} />
                    {errors.deliveryTime && <span className="text-xs text-error font-medium text-left ml-1">{errors.deliveryTime}</span>}
                </div>
                <div className="flex flex-col gap-1 md:col-span-2 max-w-md">
                    <Label className="text-left ml-1">Products</Label>
                    <Input type="text" name="products" placeholder="e.g. Pulses, Dals, etc" className="h-10"
                        value={input.products} onChange={(e) => setInput({ ...input, products: e.target.value.split(",") })} />
                    {errors.products && <span className="text-xs text-error font-medium text-left ml-1">{errors.products}</span>}
                </div>
                <div className="flex flex-col gap-1 md:col-span-2 max-w-md">
                    <Label className="text-left ml-1">Upload Store Banner</Label>
                    <Input type="file" accept="image/*" name="storeBanner" className="h-10"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setInput((prev) => ({ ...prev, storeBanner: file || undefined }));
                        }} />
                    {errors.storeBanner && <span className="text-xs text-error font-medium text-left ml-1">{errors.storeBanner?.name || "Banner image is required*"}</span>}
                </div>
                <div className="md:col-span-2 flex justify-center mt-6">
                    {loading ? (
                        <Button disabled className="bg-brandGreen text-white w-full max-w-xs flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin h-4 w-4" /> Please wait...
                        </Button>
                    ) : (
                        <Button className="bg-brandGreen hover:bg-brandGreen/80 text-white w-full max-w-xs">
                            {storeExists ? "Update Store" : "Add Store"}
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Store;
