import { Request, RequestHandler, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary";
import { genVerificationCode } from "../utils/genVerificationCode";
import { generateToken } from "../utils/generatToken";
import { sendResetPasswordEmail, sendSuccessResetPasswordEmail, sendVerificationEmail, sendWellcomeEmail } from "../mailtrap/email";

{/* for sign up */ }
export const signUp = async (req: Request, res: Response): Promise<void>=> {
    try {
        const { fullname, email, password, contact } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const verificationToken = genVerificationCode();

        user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            contact: Number(contact),
            verificationToken,
            verificationTokenExpires: Date.now() + 60 * 60 * 1000,
        });

        generateToken(res,user);

        await sendVerificationEmail(email, verificationToken);

        const userWithoutPassword = await User.findOne({ email }).select("-password");

        res.status(201).json({ success: true, message: "Account created successfully", user: userWithoutPassword });
        return;

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;

    }
};

{/* for login */ }
export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Incorrect email or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Incorrect email or password" });
        }

        generateToken(res, user);
        user.lastLogin = new Date();
        await user.save();

        {/*send User without password*/ }
        const userWithoutPassword = await User.findOne({ email }).select("-password");
        return res.status(200).json({ success: true, message: "Welcome back $(user.fullname)", user: userWithoutPassword });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

{/* for verify Email */ }
export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { verificationCode } = req.body;
        const user = await User.findOne({ verificationToken: verificationCode, verificationTokenExpires: { $gt: Date.now() } }).select("-password");

        if (!user) {
            return res.status(400).json({ success: false, message: "Incorrect or expired verification token!" });
        }
        user.isverified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        // send welcome Email
        await sendWellcomeEmail(user.email, user.fullname);

        return res.status(200).json({ success: true, message: "Email verified successfully!", user, });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


{/* for logout */ }

export const logout = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        user.lastLogin = new Date();
        await user.save();
        return res.clearCookie("token").status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


{/* for forgot password */ }
export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const resetToken = crypto.randomBytes(40).toString("hex");
        const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpires;
        await user.save();

        //send reset password email
        await sendResetPasswordEmail(user.email, `${process.env.FRONTEND_URL}reset-password?token=${resetToken}`);

        return res.status(200).json({ success: true, message: "Password reset link sent successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

{/* for reset password */ }
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token} = req.params;
        const {password} = req.body;
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ success: false, message: "Incorrect or expired reset token!" });
        }

        //update password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        //send Success Email
        await sendSuccessResetPasswordEmail(user.email);

        return res.status(200).json({ success: true, message: "Password reset successfully" });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


{/* for checking Auth */ }
export const checkAuth = async (req: Request, res: Response) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        };
        return res.status(200).json({ success: true, message: "User found", user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

{/* for updating user profile */ }
export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.id;
        const { fullname, email, contact, address, city, profilePicture } = req.body;

        //upload image on cloudinary
        let cloudResponse: any;
        cloudResponse = await cloudinary.uploader.upload(profilePicture);
        const updatedData = {
            fullname,
            email,
            contact,
            address,
            city,
            profilePicture,
        };

        const user = await User.findByIdAndUpdate(userId,updatedData,{new:true}).select("-password");
        return res.status(200).json({ success: true, message: "Profile updated successfully", user });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};