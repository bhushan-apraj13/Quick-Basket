import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./emailDesign";
import { transporter, sender } from "../smtp/smtp";

{/* for sending verification email */ }
export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    console.log(`📩 Sending verification email to: ${email}`);
    try {
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Verify Your Email",
            html: htmlContent.replace("{verificationToken}", verificationToken),
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent: ${info.messageId}`);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Failed to send verification email");
    }
}

{/* for sending welcome email */ }
export const sendWellcomeEmail = async (email: string, fullname: string) => {
    try {
        const htmlContent = generateWelcomeEmailHtml(fullname);
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Welcome to QuickBasket",
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email");
    }
};

{/* for sending forgot password email */ }
export const sendResetPasswordEmail = async (email: string, resetPasswordLink: string) => {
    try {
        const htmlContent = generatePasswordResetEmailHtml(resetPasswordLink);
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Reset Password",
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending reset password email:", error);
        throw new Error("Failed to send reset password email");
    }
};


{/* for sending success reset password email */ }
export const sendSuccessResetPasswordEmail = async (email: string) => {
    try {
        const htmlContent = generateResetSuccessEmailHtml();
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Password Reset Successfully",
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending success reset email:", error);
        throw new Error("Failed to send reset success email");
    }
};