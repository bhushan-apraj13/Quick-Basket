import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route";
import shopRoute from "./routes/shop.route";
import productRoute from "./routes/product.route";
import orderRoute from "./routes/order.route";

const app = express();
const PORT = process.env.PORT || 3000;

// default middlewares 
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5175/",
    credentials: true
}
app.use(cors(corsOptions));

//api 
app.use("/api/v1/user", userRoute);
app.use("/api/v1/shop", shopRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
