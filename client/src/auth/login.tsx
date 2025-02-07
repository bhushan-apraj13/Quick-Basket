import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

const Login = () => {
    return (

        <div className="flex items-center justify-center min-h-screen">

            <form className="md:p-8 w-full max-w-md  rounded-lg md:border border-gray-200 mx-4">
                <div className="mb-4">
                    <h1 className="font-bold text-2xl">QuickBasket</h1>
                </div>
                <div className="relative">
                    <Input
                        type="email"
                        placeholder="Enter your email" className="pl-10 border border-gray-300 focus:border-gray-300 focus:ring-0 focus:ring-gray-300"
                    />
                    <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
                </div>

                <Label>Password</Label>
                <Input
                    type="password"
                    placeholder="Enter your password"

                />
            </form>
        </div>
    );
};

export default Login;