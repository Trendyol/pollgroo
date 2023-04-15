import { signIn } from 'next-auth/react';
import { FormValues } from '@/../../packages/ui';

const loginUser = async ({ email, password }: FormValues) => {
  const res = await signIn('credentials', {
    redirect: false,
    email,
    password,
  });

  return res;
};

export default loginUser;
