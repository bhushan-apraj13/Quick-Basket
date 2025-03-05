import mongoose from "mongoose";

export interface IUser {
    fullname: string;
    email: string;
    password: string;
    contact: number;
    address: string;
    city: string;
    profilePicture: string;
    admin: boolean;
    lastLogin?: Date;
    isverified?: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    verificationToken?: string;
    verificationTokenExpires?: Date;
}

export interface UserDocument extends IUser, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    profilePicture: {
        type: String,
        default: "",
        required: false,
    },
    admin: {
        type: Boolean,
        default: false,
    },

    //Advanced Authentication
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isverified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verificationToken: String,
    verificationTokenExpires: Date,
},{timestamps: true});

export const User =  mongoose.model("User", userSchema);


