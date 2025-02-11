import { Link } from "react-router-dom";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { History, ListChecks, ListTodo, Loader2, LogOut, LucideShoppingCart, Menu, Moon, ShoppingCartIcon, Store, Sun, User, X } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

const Navbar = () => {
    const admin = true;
    const loading = false;
    return (
        <div className="fixed top-2 left-0 w-full bg-white  z-50">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                {/* Left-aligned Brand Logo */}
                <Link to="/"><h1 className="text-brandOrange font-extrabold text-3xl
                md:text-4x1 hover:text-brandGreen">QuickBasket</h1>
                </Link>

                {/* Right-aligned Navbar Links */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-textPrimary hover:text-brandGreen transition">
                            Home
                        </Link>
                        <Link to="/profile" className="text-textPrimary hover:text-brandGreen transition">
                            Profile
                        </Link>
                        <Link to="/order/status" className="text-textPrimary hover:text-brandGreen transition">
                            Order
                        </Link>

                        {
                            admin && (
                                <Menubar>
                                    <MenubarMenu>
                                        <MenubarTrigger className="bg-transparent text-textPrimary hover:bg-brandGreen hover:text-white data-[state=open]:bg-brandGreen data-[state=open]:text-white transition">
                                            Dashboard
                                        </MenubarTrigger>

                                        <MenubarContent className="bg-white shadow-lg rounded-md">
                                            <Link to="/admin/shops">
                                                <MenubarItem className="px-3 py-2 text-textPrimary hover:bg-brandOrange hover:text-white transition">
                                                    Store
                                                </MenubarItem>
                                            </Link>
                                            <Link to="/admin/Menu">
                                                <MenubarItem className="px-3 py-2 text-textPrimary hover:bg-brandOrange hover:text-white transition">
                                                    Products
                                                </MenubarItem>
                                            </Link>
                                            <Link to="/admin/orders">
                                                <MenubarItem className="px-3 py-2 text-textPrimary hover:bg-brandOrange hover:text-white transition">
                                                    Orders
                                                </MenubarItem>
                                            </Link>
                                        </MenubarContent>
                                    </MenubarMenu>

                                </Menubar>
                            )
                        }
                    </div>
                    <div className="flex items-center gap-6 h-10">
                        {/* Theme Toggle */}
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-10 w-10 flex items-center justify-center">
                                        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Light</DropdownMenuItem>
                                    <DropdownMenuItem>Dark</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Cart Icon */}
                        <Link to="/cart" className="relative cursor-pointer text-textPrimary hover:text-brandGreen transition flex items-center">
                            <LucideShoppingCart className="h-6 w-6" />
                            <div className="absolute -top-2 -right-2 text-[10px] font-bold flex items-center justify-center rounded-full h-5 w-5 bg-brandGreen text-white">
                                1
                            </div>
                        </Link>

                        {/* Avatar (Properly Aligned & Visible) */}
                        <div className="relative flex items-center">
                            <Avatar className="h-9 w-9border border-gray-300">
                                <AvatarImage />
                                <AvatarFallback className="flex items-center justify-center h-full w-full text-sm font-medium">CN</AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Logout Button (Fixed Size) */}
                        <div>
                            {loading ? (
                                <Button disabled className="w-28 h-10 bg-brandOrange text-white rounded-md hover:bg-opacity-90 transition border-transparent flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin h-4 w-4" /> Please wait...
                                </Button>
                            ) : (
                                <Button className="w-24 h-10 bg-brandOrange text-white hover:bg-opacity-90 transition">
                                    Logout
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="md:hidden lg:hidden">
                    {/* Mobile Respond */}
                    <MobileNavbar />
                </div>
            </div>
        </div>
    );
};

export default Navbar;

const MobileNavbar = () => {
    
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size={"icon"} className="rounded-full bg-gray-200 text-textPrimary hover:bg-gray-300 transition">
                    <Menu size={'18'} />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col pl-2">
                {/* Override the default close button */}
                <SheetClose className="absolute right-8 top-6 text-textPrimary  transition focus:outline-none p-0 bg-transparent border-none shadow-none">
                    <X className="h-6 w-6" />
                </SheetClose>
                <SheetHeader className="flex  flex-row items-center justify-betweeen mt-2">
                    <div className="absolute top-5">
                        <SheetTitle>Quick Basket</SheetTitle>
                    </div>

                    <div className="absolute right-6 top-12 font-extrabold">
                        {/* Theme Toggle Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                >
                                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>

                            {/* Dropdown Menu Positioned at the Top Right */}
                            <DropdownMenuContent
                                align="end"
                            >
                                <DropdownMenuItem>Light</DropdownMenuItem>
                                <DropdownMenuItem>Dark</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>


                </SheetHeader>
                <Separator className="my-2 mt-12" />
                <SheetDescription className="flex-1">
                    <Link
                        to="/profile"
                        className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer transition 
             text-textPrimary hover:bg-[#EAEAEA] active:bg-[#EAEAEA] hover:text-brandGreen 
             active:text-brandGreen"
                    >
                        <User />
                        <span>Profile</span>
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer transition 
             text-textPrimary hover:bg-[#EAEAEA] active:bg-[#EAEAEA] hover:text-brandGreen 
             active:text-brandGreen"
                    >
                        <History />
                        <span>Orders</span>
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer transition 
             text-textPrimary hover:bg-[#EAEAEA] active:bg-[#EAEAEA] hover:text-brandGreen 
             active:text-brandGreen"
                    >
                        <ShoppingCartIcon />
                        <span>Cart</span>
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer transition 
             text-textPrimary hover:bg-[#EAEAEA] active:bg-[#EAEAEA] hover:text-brandGreen 
             active:text-brandGreen"
                    >
                        <ListTodo />
                        <span>Products</span>
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer transition 
             text-textPrimary hover:bg-[#EAEAEA] active:bg-[#EAEAEA] hover:text-brandGreen 
             active:text-brandGreen"
                    >
                        <Store />
                        <span>My Store</span>
                    </Link>
                    <Link
                        to="/profile"
                        className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer transition 
             text-textPrimary hover:bg-[#EAEAEA] active:bg-[#EAEAEA] hover:text-brandGreen 
             active:text-brandGreen"
                    >
                        <ListChecks />
                        <span>Store Orders </span>
                    </Link>

                </SheetDescription>

                <SheetFooter>
                        
                            <SheetClose asChild>
                                <Button type="submit" className="bg-brandOrange text-white hover:bg-opacity-90 transition">Logout <LogOut></LogOut></Button>
                            </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}