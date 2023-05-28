import NextAuth from "next-auth/next";
import { connectToDB } from '@utils/database';
import GitHubProvider from "next-auth/providers/github";
import User from "@models/user";
import { signIn } from "next-auth/react";



const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile,user }) {
            try {
                await connectToDB();
                console.log(profile.email,user);
               
                //check if a user already exixts
                const userExists = await User.findOne({ email: user.email });
                // if not create a new user 
                if (!userExists) {
                    await User.create({
                        email: user.email,
                        username: user.name.toLowerCase(),
                        image: user.image
                    })
                }
                // check 
                
                return true
            } catch (error) {
                console.log(error,"error come in login");
                return false
            }
        }
    }
})

export { handler as GET, handler as POST };