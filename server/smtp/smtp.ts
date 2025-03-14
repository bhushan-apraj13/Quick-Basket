import dotenv from "dotenv";
dotenv.config();
console.log("🚀 SMTP Config Loaded");
import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // ✅ Use `true` if using port 465 (SSL)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("❌ SMTP Connection Failed:", error);
    } else {
        console.log("✅ SMTP Connection Successful");
    }
});
// ✅ Sender Email Configuration
export const sender = {
    email: process.env.SMTP_USER, // Uses the authenticated Gmail
    name: "QuickBasket",
};