import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@database/mongodb";
import User from "@database/models/User.model";
import { compare } from "bcryptjs";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }

        await connectToDB()

        /* Check if the user exists */
        const user = await User.findOne({ email: credentials.email });

        if (!user || !user?.password) {
          throw new Error("Invalid email or password");
        }

        /* Compare password */
        const isMatch = await compare(credentials.password, user.password);

        if (!isMatch) {
          throw new Error("Invalid password");
        }

        return user
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
      const mongodbUser = await User.findOne({ email: session.user.email })
      session.user.id = mongodbUser._id.toString()

      session.user = {...session.user, ...mongodbUser._doc}

      return session
    }
  }
});

export { handler as GET, handler as POST };
