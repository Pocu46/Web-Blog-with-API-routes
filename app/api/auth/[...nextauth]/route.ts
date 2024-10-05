import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {connectToDB} from "@/utils/database";
import User from "@/models/user";
import bcrypt from "bcrypt";
import type {NextAuthOptions, User as NextAuthUser} from "next-auth";
import Github from "next-auth/providers/github";
import {validateEmail} from "@/utils/methods";

type UserType = NextAuthUser & {
  id?: string;
  _id?: string;
  email: string;
  name: string;
  password: string;
  login?: string;
  avatar_url?: string;
  picture?: string;
  image: {
    imageName: string;
    imageLink: string;
  }
};

type updatedUserType = {
  email: string;
  name: string;
  picture: string;
}

export const authOptions: NextAuthOptions = {
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

          if (user && passwordCompare && validateEmail(credentials.email)) {
            const userWithoutPassword = {
              id: user["_id"]?.toString(),
              email: user.email,
              name: user.name
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
    async session({session, token, trigger, newSession}) {
      const sessionUser = await User.findOne({name: session?.user?.name})
      const updatedUser = {
        ...session.user,
        id: sessionUser?.id,
        image: sessionUser.image
      }
      session.user = updatedUser

      return session;
    },
    async jwt({token, trigger, session, profile}) {
      if(trigger === "update" && session.name) {
        if(session.email) token.email = session.email
        if(session.name) token.name = session.name
        if(session.image) token.picture = session.image
      }
      return token
    },
    async signIn({account, profile}) {
      if (account && account.provider === "credentials") {
        return true
      }
      if (account && account.provider === "google") {
        try {
          await connectToDB();

          if (profile) {
            // check if user already exists
            const userExists = await User.findOne({email: profile.email});
            // if not, create a new document and save user in MongoDB
            if (!userExists && profile.email && validateEmail(profile?.email)) {
              const updatedUser = {...profile} as updatedUserType
              await User.create({
                email: updatedUser.email,
                name: updatedUser.name,
                image: {
                  imageName: updatedUser.picture,
                  imageLink: updatedUser.picture
                }
              });
            }

            return true
          }
        } catch (error: Error | unknown) {
          if (error) {
            console.log("Error checking if user exists: ", error)
            return false
          }
        }
      }
      if (account && account.provider === "github") {
        try {
          await connectToDB();

          if (profile) {
            // check if user already exists
            const githubUser = {...profile} as UserType
            const userExists = await User.findOne({name: githubUser.login})

            // if not, create a new document and save user in MongoDB
            if (!userExists) {
              await User.create({
                email: githubUser.login,
                name: githubUser.login,
                image: {
                  imageName: githubUser.avatar_url,
                  imageLink: githubUser.avatar_url
                }
              });
            }

            return true
          }
        } catch (error: Error | unknown) {
          if (error) {
            console.log("Error checking if user exists: ", error);
            return false
          }
        }
      }
      return false
    }
  }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};