import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./emailDesign";
import { client, sender } from "./mailtrap";

{/* for sending verification email */ }
export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    const recipient = [ {email} ];
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Verify your EMail",
            html: htmlContent.replace("{verificationToken}", verificationToken),
            category: " Email verification",
        });
        
    } catch (error) {
        console.log(error);
        throw new Error("Error sending verification email");
    }
}

{/* for sending welcome email */ }
export const sendWellcomeEmail = async (email: string, fullname: string) => {
    const recipient = [ {email} ];
    const htmlContent = generateWelcomeEmailHtml(fullname);
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Welcome to Quick-Basket",
            html: htmlContent,
            template_variables:{
                company_info_name:"Qucik-Basket",
                fullname
            }
        });
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send welcome email");
    }
};

{/* for sending forgot password email */ }
export const sendResetPasswordEmail = async (email: string, resetPasswordLink: string) => {
    const recipient = [ {email} ];
    const htmlContent = generatePasswordResetEmailHtml(resetPasswordLink);
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Reset Password",
            html: htmlContent,
            category: "Password reset"
        });
        
    }
     catch (error) {
        console.log(error);
        throw new Error("Failed to send reset password email");
    }
};


{/* for sending success reset password email */ }
export const sendSuccessResetPasswordEmail = async (email: string) => {
    const recipient = [ {email} ];
    const htmlContent = generateResetSuccessEmailHtml();
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Password reset successfully",
            html: htmlContent,
            category: "Reset Password",
        });
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send reset password success email");
    }
};