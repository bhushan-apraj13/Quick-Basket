import { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const CheckoutConfirm = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const [UserData, getUserData] = useState({
        fullname: "",
        contact: "",
        address: "",
        city: "",
    });

    const CheckoutHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //api implemnetation starts here
        console.log(UserData);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-4 space-y-2">
                <DialogTitle className="text-extrabold mt-1">Review Your Order</DialogTitle>
                <DialogDescription className="text-sm text-gray-500">
                    Please verify your details and order summary before proceeding.
                </DialogDescription>

                {/* User Info */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label className="block text-sm font-semibold">Full Name</Label>
                        <p className="text-gray-700">John Doe</p>
                    </div>
                    <div>
                        <Label className="block text-sm font-semibold">Contact</Label>
                        <p className="text-gray-700">+91 98765 43210</p>
                    </div>
                    <div>
                        <Label className="block text-sm font-semibold">Address</Label>
                        <p className="text-gray-700">123, Green Avenue, Mumbai</p>
                    </div>
                    <div>
                        <Label className="block text-sm font-semibold">City</Label>
                        <p className="text-gray-700">Mumbai</p>
                    </div>
                </div>

                <Separator className="my-4" />

                {/* Order Summary */}
                <div className="space-y-2">
                    <h2 className="font-bold text-center">Order Summary</h2>
                    <div className="flex justify-between text-sm">
                        <span>Chana Daal x 2</span>
                        <span>₹200</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Basmati Rice x 1</span>
                        <span>₹150</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg mt-2">
                        <span>Total:</span>
                        <span>₹350</span>
                    </div>
                </div>

                {/* Buttons */}
                <DialogFooter className="flex justify-end mt-4">
                    <Button className="bg-brandGreen text-white hover:bg-brandGreen/80">
                        Proceed to Payment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutConfirm;
