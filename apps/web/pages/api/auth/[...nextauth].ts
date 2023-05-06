import { compare } from 'bcryptjs';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToMongoDB from '@/lib/db';
import User from '@/pages/api/models/user';
import('@/pages/api/models/team');

interface UserDto {
  id: string;
  fullname: string;
  email: string;
  profileCircleBackgroundColor?: string,
  profileCircleTextColor?: string,
  profileCircleText?: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToMongoDB().catch((err) => {
          throw new Error(err);
        });

        const user = await User.findOne({
          email: credentials?.email,
        }).select('+password').populate('teams');

        if (!user) {
          throw new Error('Invalid credentials');
        }

        const isPasswordCorrect = await compare(credentials!.password, user.password);

        if (!isPasswordCorrect) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user._id,
          email: user.email,
          fullname: user.fullname,
          profileCircleBackgroundColor: user.profileCircleBackgroundColor,
          profileCircleTextColor: user.profileCircleTextColor,
          profileCircleText: user.profileCircleText
        } as UserDto;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as UserDto;

      return session;
    },
  },
};

export default NextAuth(authOptions);
