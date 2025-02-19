// mongopassword = VKjCpVOJ26U1El4G
// mongousername = bhushanapraj69

import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
            console.log("Connected to MongoDB");
    }
     catch (error) {
        console.log(error);
    }
    
};

export default connectDB;