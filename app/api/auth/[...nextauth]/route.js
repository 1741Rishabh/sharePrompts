import NextAuth from "next-auth/next";
import { connectToDB } from '@utils/database';
import GitHubProvider from "next-auth/providers/github";
import User from "@models/user";
import { signIn } from "next-auth/react";

console.log("route file run ");


const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            console.log("rishabh database");
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            try {
                console.log("sign in funtion");
                await connectToDB();
                console.log("sign end funtion");

                //check if a user already exixts
                const userExists = await User.findOne({ email: profile.email });
                // if not create a new user 
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.profile
                    })
                }
                // check 
            } catch (error) {

            }
        }
    }
})

export { handler as GET, handler as POST };