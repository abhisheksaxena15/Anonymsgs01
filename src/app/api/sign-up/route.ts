import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(requesy: Request) {
    await dbConnect();

    try {
        const {username , email , password} = await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username , 
            isVerified : true
        })
        if (existingUserVerifiedByUsername){
            return Response.json(
                {
                    success : false ,   
                    message : " Username is already taken "
                } , {
                    status : 400
                }
            )
        }
        const existingUserVerifiedByEmail = await UserModel.findOne({email})

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()


        if (existingUserVerifiedByEmail){
            if (existingUserVerifiedByEmail.isVerified){
                return Response.json(
                    {
                        success : false ,   
                        message : " Email is already registered with this eai;l address .Please login to your account ."
                    } , {
                        status : 400
                    }
                )
            } else {
                //update the existing unverified user with new details
                const hasedPassword = await bcrypt.hash(password , 10)
                existingUserVerifiedByEmail.password = password
                existingUserVerifiedByEmail.verifyCode = verifyCode
                existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)// date is returning object there fore let var const any one can be used object is just a reference in memory
                await existingUserVerifiedByEmail.save()
            }
        }
        else{
            const hasedPassword = await bcrypt.hash(password , 10)
            const expiryDate = new Date()// date is returning object there fore let var const any one can be used object is just a reference in memory
            expiryDate.setHours(expiryDate.getHours() + 1)
            const newUser = new UserModel({
                username ,
                    email,
                    password : hasedPassword,
                    verifyCode,
                    verifyCodeExpiry:expiryDate,
                    isVerified: false,
                    isAccepingMessages: true,
                    messages: []
                    
            })

            await newUser.save()
        }
        //send verification email
       const emailResponse =  await sendVerificationEmail(email , username,verifyCode)

       if (!emailResponse.success){
        return Response.json(
            {
                success : false ,
                message : " Failed to send verification email .Please try again later ."
            } , {
                status : 500
            }
        )
       }

       return Response.json(
            {
                success : true ,
                message : " user registered successfully .Please check your email for verification code ."
            } , {
                status : 201
            }
        )

    } catch (error) {
        console.error("Error during user sign-up:", error);
        return Response.json(
            {
                succcess: false,
                message: " Error registering user "
            }
            , {
                status: 500
            }
        );
    }
}