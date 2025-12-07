import {resend}from "@/lib/resend";
import { EmailTemplate } from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email : string,//fucntion which will be used by the user model to send verification email
    username : string,
    verifyCode : string 
): Promise<ApiResponse>{
    try {
       await resend.emails.send({
        from: 'onboarding@resend.dev',
      to:  email,
      subject: 'verification code for AnonyMsgs',
      react: EmailTemplate({ firstName: 'John' }),
       });
        return { 
            success : true , 
            message : "Verification email sent successfully."};
        // await resend.emails.send({
        //     from: '
    } catch (emailError) {
        console.error("Error sending verification email:", emailError);
        return {
            success: false,
            message: "Failed to send verification email."
        };
    }
}