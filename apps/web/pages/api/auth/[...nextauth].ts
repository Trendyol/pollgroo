import { compare } from 'bcryptjs';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import connectToMongoDB from '@/lib/db';
import User from '@/pages/api/models/user';
import('@/pages/api/models/team');

interface UserDto {
  id: string;
  fullname: string;
  email: string;
  profileCircleBackgroundColor?: string;
  profileCircleTextColor?: string;
  profileCircleText?: string;
  userType: string;
  image?: string;
  googleId?: string;
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
        })
          .select('+password')
          .populate('teams');

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
          profileCircleText: user.profileCircleText,
          userType: user.userType,
        } as UserDto;
      },
    }),
    GoogleProvider({
      id: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
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
    signIn: async (params) => {
      const { user, account, profile } = params;
      if (account?.provider === 'google') {
        await connectToMongoDB().catch((err) => {
          throw new Error(err);
        });

        const userDto = {
          email: profile?.email,
          fullname: profile?.name,
          profileCircleBackgroundColor: '',
          profileCircleTextColor: '',
          profileCircleText: '',
          image: user.image,
          googleId: profile?.sub,
        } as UserDto;

        const existingUser = await User.findOne({ email: user.email });

        if (existingUser?.googleId) {
          user.id = existingUser._id;
          (user as UserDto).fullname = user.name ?? '';
          (user as UserDto).userType = existingUser.userType;
          await User.updateOne({ email: user.email }, { $set: { image: user.image } });
          return true;
        }

        if (existingUser) {
          user.id = existingUser._id;
          (user as UserDto).fullname = user.name ?? '';
          (user as UserDto).userType = existingUser.userType;
          await User.updateOne({ email: user.email }, { $set: { googleId: user.id, image: user.image } });
        } else {
          try {
            const createdUser = await User.create(userDto);
            user.id = createdUser._id;
            (user as UserDto).fullname = user.name ?? '';
            (user as UserDto).userType = existingUser.userType;
          } catch (e) {
            console.log(e);
          }
        }
      }
      return true;
    },
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
