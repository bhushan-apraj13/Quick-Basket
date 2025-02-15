import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import { useEffect, useState } from "react";
import CheckoutConfirm from "./CheckoutConfirm";
import { useLocation } from "react-router-dom";

const Cart = () => {
    const [open, setOpen] = useState<boolean>(false);

    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Set success message from navigation state (if available)
    useEffect(() => {
        if (location.state?.successMessage) {
            setSuccessMessage(location.state.successMessage);

            // Clear message after 3 seconds
            setTimeout(() => setSuccessMessage(null), 3000);
        }
    }, [location.state]);


    return (
        <div className="max-w-7xl mx-auto mt-12 px-4">
            {/* Cart Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/3">Product</TableHead>
                        <TableHead className="w-1/6 text-center">Price</TableHead>
                        <TableHead className="w-1/4 text-center">Quantity</TableHead>
                        <TableHead className="w-1/6 text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        {/* Product */}
                        <TableCell>
                            <div className="flex items-center gap-3">

                                <span>Chana Daal</span>
                            </div>
                        </TableCell>

                        {/* Price */}
                        <TableCell className="text-center">₹100</TableCell>

                        {/* Quantity */}
                        <TableCell className="text-center">
                            <div className="inline-flex items-center gap-1 border border-gray-300 dark:border-gray-700 rounded-full px-1 py-0.5">
                                <Button className="p-0.5 bg-textSecondary hover:bg-textSecondary/80 dark:bg-gray-200 rounded-full" size="icon">
                                    <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-5 text-center font-bold text-sm">1</span>
                                <Button className="p-0.5 bg-brandOrange hover:bg-brandOrange/80 text-white rounded-full" size="icon">
                                    <Plus className="w-3 h-3" />
                                </Button>
                            </div>
                        </TableCell>


                        {/* Total */}
                        <TableCell className="text-right">₹100</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell className="font-semibold text-left">Total</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-right font-semibold">₹100</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            {/* Buttons Container - Centered & Side by Side */}
            <div className="flex justify-end items-center gap-4 mt-6">
                <Button onClick={() => setOpen(true)} className="bg-brandGreen text-white hover:bg-brandGreen/80 w-full max-w-[100px] h-10 ">
                    Proceed
                </Button>
                <Button className="bg-error text-white hover:bg-error/80 w-full max-w-[100px] h-10">
                    Clear All
                </Button>
            </div>
            {/* Success Alert */}
            {successMessage && (
                <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
                    {successMessage}
                </div>
            )}

            <CheckoutConfirm open={open} setOpen={setOpen} />
        </div>
    );
};

export default Cart;
