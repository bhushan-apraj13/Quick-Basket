import { Mail, Phone, Home, Plus, User, Loader2, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ProfileInputState, userProfileSchema } from "@/schema/userSchema";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
    {/* Profile Data State */ }
    const [profileData, setProfileData] = useState<any>({
        fullname: "",
        email: "",
        contact: "",
        address: "",
        city: "",
        profileImage: "",
    });

    {/* Navigate Handler */ }
    const navigate = useNavigate();
    const location = useLocation();

    {/* Form Errors State */ }
    const [errors, setErrors] = useState<Partial<ProfileInputState>>({});

    {/* Success Message State */ }
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    {/* Image Upload State */ }
    const imageRef = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<string>("");
    const loading = false;

    {/* Image Upload Handler */ }
    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setSelectedFile(result);
                setProfileData((prevData: any) => ({
                    ...prevData,
                    profileImage: result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    {/* Form Data Change Handler */ }
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    {/* Form Submit Handler */ }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = userProfileSchema.safeParse(profileData);
        if (!formData.success) {
            setErrors(formData.error.formErrors.fieldErrors as Partial<ProfileInputState>);
            return;
        }

        // Check if the user navigated from "/cart"
        if (location.state?.from === "/cart") {
            navigate("/cart", { state: { successMessage: "Profile updated successfully! ✅" } });

        } else {
            setSuccessMessage("Profile saved successfully! ✅");
            setTimeout(() => setSuccessMessage(null), 3000); // Hide message after 3 sec
        }
        console.log(profileData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto my-10 border border-gray-300 p-8 rounded-lg">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar Section */}
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                    <Avatar className="w-full h-full">
                        <AvatarImage src={selectedFile || ""} />
                        <AvatarFallback>BP</AvatarFallback>
                    </Avatar>
                    <input
                        ref={imageRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={fileChangeHandler}
                    />
                    <div
                        onClick={() => imageRef.current?.click()}
                        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
                    >
                        <Plus className="h-8 w-8 text-white" />
                    </div>
                </div>

                {/* Full Name Input */}
                <div className="flex flex-col w-full md:w-2/5">
                    <div className="flex items-center gap-2 mb-1">
                        <User className="w-5 h-5 text-textPrimary" />
                        <Label className="text-textPrimary text-sm">Full Name</Label>
                    </div>
                    <Input
                        type="text"
                        name="fullname"
                        value={profileData.fullname}
                        onChange={changeHandler}
                        placeholder="Enter Full Name"
                        className="w-full border-b border-gray-400 outline-none focus:ring-0"
                    />
                    {
                        errors && <span className="text-xs text-error">{errors.fullname}</span>
                    }
                </div>
            </div>

            {/* Profile Details (Now in 2x2 Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Email Field */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <Mail className="w-5 h-5 text-textPrimary" />
                        <Label className="text-textPrimary text-sm">Email</Label>
                    </div>
                    <Input
                        type="text"
                        name="email"
                        value={profileData.email}
                        onChange={changeHandler}
                        placeholder="Enter Email"
                        className="w-full border-b border-gray-400 outline-none focus:ring-0"
                    />
                    {
                        errors && <span className="text-xs text-error">{errors.email}</span>
                    }
                </div>

                {/* Phone Field */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <Phone className="w-5 h-5 text-textPrimary" />
                        <Label className="text-textPrimary text-sm">Phone</Label>
                    </div>
                    <Input
                        type="text"
                        name="contact"
                        value={profileData.contact}
                        onChange={changeHandler}
                        placeholder="Enter Phone Number"
                        className="w-full border-b border-gray-400 outline-none focus:ring-0"
                    />
                    {
                        errors && <span className="text-xs text-error">{errors.contact}</span>
                    }
                </div>

                {/* Address Field */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <Home className="w-5 h-5 text-textPrimary" />
                        <Label className="text-textPrimary text-sm">Address</Label>
                    </div>
                    <Input
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={changeHandler}
                        placeholder="Enter Address"
                        className="w-full border-b border-gray-400 outline-none focus:ring-0"
                    />
                    {
                        errors && <span className="text-xs text-error">{errors.address}</span>
                    }
                </div>

                {/* City Field */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-5 h-5 text-textPrimary" />
                        <Label className="text-textPrimary text-sm">City</Label>
                    </div>
                    <Input
                        type="text"
                        name="city"
                        value={profileData.city}
                        onChange={changeHandler}
                        placeholder="Enter City"
                        className="w-full border-b border-gray-400 outline-none focus:ring-0"
                    />
                    {
                        errors && <span className="text-xs text-error">{errors.city}</span>
                    }
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
                {loading ? (
                    <Button
                        type="submit"
                        disabled
                        className="bg-brandOrange text-white px-8 py-2 hover:bg-opacity-90 transition"
                    >
                        <Loader2 className="animate-spin mr-2 w-4 h-4" /> Saving...
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        className="bg-brandOrange text-white px-8 py-2 hover:bg-opacity-90 transition"
                    >
                        Save Changes
                    </Button>
                )}
            </div>
             {/* Success Alert */}
             {successMessage && (
                <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
                    {successMessage}
                </div>
            )}
        </form>
    );
};

export default Profile;
