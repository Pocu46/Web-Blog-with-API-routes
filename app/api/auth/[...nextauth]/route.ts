import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {connectToDB} from "@/utils/database";
import User from "@/models/user";
import bcrypt from "bcrypt";
import type {NextAuthOptions, User as NextAuthUser} from "next-auth";
import Github from "next-auth/providers/github";

type UserType = NextAuthUser & {
  id?: string;
  _id?: string;
  email: string;
  username: string;
  password: string;
  login?: string;
  avatar_url?: string;
  picture?: string;
};

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    CredentialsProvider({
      credentials: {
        email: {label: 'Email', type: 'email', required: true},
        password: {label: 'Password', type: 'password', required: true},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          await connectToDB();

          // check if user already exists
          const user = await User.findOne({email: credentials.email}) as UserType;

          if (!user) {
            return null;
          }

          const passwordCompare = await bcrypt.compare(credentials.password, user.password);

          if (user && passwordCompare) {
            const userWithoutPassword = {
              id: user._id?.toString(),
              email: user.email,
              username: user.username
            }

            return userWithoutPassword as NextAuthUser;
          }
        } catch (error) {
          console.error("User doesn't exist");
          console.error(error);
          return null;
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
    newUser: '/auth/copyrights'
  },
  callbacks: {
    async session({session , token}) {
      session.user = token.user as UserType;
      const sessionUser = await User.findOne({ email: session.user.email })
      const userWithId = {id: sessionUser._id.toString(), ...sessionUser}
      session.user = userWithId

      return session;
    },
    async jwt({token, user}) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async signIn({account, profile}) {
      if(account && account.provider === "credentials") {
        return true
      }
      if(account && account.provider === "google") {
        try {
          await connectToDB();

          if(profile) {
            // check if user already exists
            const userExists = await User.findOne({ email: profile.email });
            const googleUser = {...userExists} as UserType

            // if not, create a new document and save user in MongoDB
            if (!userExists && profile.email) {
              await User.create({
                email: googleUser.email,
                username: googleUser?.name,
                image: googleUser.picture,
              });
            }

            return true
          }
        } catch (error: Error | unknown) {
          if(error) {
            console.log("Error checking if user exists: ", error)
            return false
          }
        }
      }
      if(account && account.provider === "github") {
        try {
          await connectToDB();

          if(profile) {
            // check if user already exists
            const githubUser  = {...profile} as UserType
            const userExists = await User.findOne({ username: githubUser.login });

            // if not, create a new document and save user in MongoDB
            if (!userExists) {
              await User.create({
                username: githubUser.login,
                image: githubUser.avatar_url,
              });
            }

            return true
          }
        } catch (error: Error | unknown) {
          if(error) {
            console.log("Error checking if user exists: ", error);
            return false
          }
        }
      }
      return false
    }
  }
};

const handler = NextAuth(options);

export {handler as GET, handler as POST};