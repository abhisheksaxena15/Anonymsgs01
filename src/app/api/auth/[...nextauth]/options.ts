import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// import Facebook from "next-auth/providers/facebook" 
import { compare } from "bcryptjs"
import dbConnect from "@/lib/dbConnect"
import User from "@/model/User"
import UserModel from "@/model/User"


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            // now next auth do not know how to authorize so we will use cust1om authorize function
            async authorize(credentials: any): Promise<any> {
                //cant authorize directly need to connect to db first
                await dbConnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })

                    if (!user) {
                        throw new Error("No user found with the given email or username")
                    }
                    if (!user.isVerified) {
                        throw new Error("Please verify your account to login")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (!isPasswordCorrect) {
                        throw new Error("Incorrect password")
                    }
                    else { return user }
                } catch (err: any) {
                    throw new Error(err)
                }
            }

        })
    ],

    callbacks: {
        async jwt({ token, user}) {
            if (user) {
                token._id = user._id?.tostring();//object id to string
                token._isVerified = user.isVerified;
                token.username = user.username;
                token.isAcceptingMessages = user.isAcceptingMessages;
            }
            return token
        },
        async session({ session,  token }) {
            if (token) {
                session.user._id = token._id 
                session.user.isVerified = token.isVerified 
                session.user.username = token.username 
                session.user.isAcceptingMessages = token.isAcceptingMessages 
            return session
        }

    },

    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: 'jwt'
    },

    secret: process.env.NEXTAUTH_SECRET
}