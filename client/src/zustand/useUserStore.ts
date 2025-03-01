import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/user"
axios.defaults.withCredentials = true;

export const useUserStore = create<any>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,

    //signUp api implementation
    signup: async (input: SignupInputState) => {

        try {
            console.log("Signup API called", input);
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/signup`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Signup response:", response.data);
            if (response.data.success) {
                console.log(response.data);
                toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
            else {
                set({ loading: false });
            }
        } catch (error:any) {
            console.error("Signup error:", error); 
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },

    //login api implementation
    login : async (input:LoginInputState)=>{
        try {
            console.log("Signup API called", input);
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("Signup response:", response.data);
            if (response.data.success) {
                console.log(response.data);
                toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
            else {
                set({ loading: false });
            }
        } catch (error:any) {
            console.error("Signup error:", error); 
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    }

}),
    {
        name: 'user-name',
        storage: createJSONStorage(() => localStorage),
    }));