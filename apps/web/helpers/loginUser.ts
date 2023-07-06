import { signIn } from 'next-auth/react';
import { FormValues } from '@/../../packages/ui';

interface LoginUserParams extends FormValues {
  providerId: string;
}

const loginUser = async ({ email, password, providerId }: LoginUserParams) => {
  const res = await signIn(providerId, {
    redirect: false,
    email,
    password,
  });

  return res;
};

export default loginUser;
