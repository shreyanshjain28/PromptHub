//setting up google auth using nextauth

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import  {connectToDB} from '@utils/database';
import User from '@models/user';

import {GOOGLE_ID,GOOGLE_CLIENT_SECRET} from '@utils/config.js'

// console.log('hit there')
// console.log({
//   clientId: process.env.GOOGLE_ID,              // TAKING FROM ENV FILE
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   nextSecret: process.env.NEXTAUTH_SECRET})

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,              // TAKING FROM ENV FILE
      clientSecret: GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      
      // store the user id from MongoDB to run current session  
      
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {

        //serverless function -- > lambda  --> dynamodb
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB  - - we need a model to create document of user will be created
        if (!userExists) {
          await User.create({       //user from models
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }