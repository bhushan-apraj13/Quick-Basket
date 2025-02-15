import {z} from "zod";

{/* Store Schema */}

export const storeSchema = z.object({
    storeName: z.string().min(3, "Store name is too short").max(50, "Store name is too long"),
    address: z.string().min(6, "Address must be at least 6 characters").max(200, "Address must be at most 200 characters"),
    city: z.string().min(3, "City must be at least 3 characters").max(50, "City must be at most 50 characters"),
    deliveryTime: z.number().min(5, "Delivery time must be at least 5 minutes ").max(100, "Delivery time must be at most 100 minutes"),
    products: z.array(z.string()).min(1, "At least 1 product is required"),
    storeBanner: z
  .instanceof(File)
  .optional()
  .refine((file) => file && file.size !== 0, "Please upload a banner image"),
});

export type StoreInfoSchema = z.infer<typeof storeSchema>;