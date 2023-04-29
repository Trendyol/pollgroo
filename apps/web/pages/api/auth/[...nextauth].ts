import { compare } from 'bcryptjs';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToMongoDB from '@/lib/db';
import User from '@/pages/api/models/user';
import { IUser } from '../interfaces';

interface UserDto {
  id: string;
  fullname: string;
  email: string;
}

const options: NextAuthOptions = {
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

        const user: IUser = await User.findOne({
          email: credentials?.email,
        }).select('+password');

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

export default NextAuth(options);