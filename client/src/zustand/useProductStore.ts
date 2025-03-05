import axios from "axios";
import { toast } from "sonner";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useShopStore } from "./useShopStore";

const API_END_POINT = "http://localhost:8000/api/v1/product";
axios.defaults.withCredentials = true;

type ProductMenuState = {
    loading : boolean,
    productmenu : null,
    createProduct: (formData:FormData)=>Promise<void>;
    editProduct: (productId:string,formData:FormData)=>Promise<void>;

}

export const useProductStore = create<ProductMenuState>()(persist((set)=>({
    loading: false,
    productmenu : null,
    createProduct: async (formData:FormData)=>{
        try {
            set({loading:true});
            const response = await axios.post(`${API_END_POINT}/`,formData,{
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            });
            if(response.data.success){
                toast.success(response.data.message);
                set({loading:false,productmenu:response.data.product});
            }
            useShopStore.getState().addProductToShop(response.data.product);

        } catch (error:any) {
            set({loading:false});
            if (error.response?.status === 400) {
                toast.error(error.response.data.message); // ✅ Show duplicate error message
            } else {
                toast.error(error.response.data.message);
            }
        }
    },
    editProduct: async (productId:string,formData:FormData)=>{
        try {
            set({loading:true});
            const response = await axios.put(`${API_END_POINT}/${productId}`,formData,{
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            });
            if(response.data.success){
                toast.success(response.data.message);
                set({loading:false,productmenu:response.data.product});
            };

            useShopStore.getState().updateProductInShop(response.data.product);
        } catch (error:any) {
            set({loading:false});
            toast.error(error.response.data.message);   
        }
    },
}),{
    name:"product-store",
    storage:createJSONStorage(()=>localStorage)
})) 