import { signIn } from 'next-auth/react';
import loginUser from '../../helpers/loginUser';

jest.mock('next-auth/react');

describe('loginUser', () => {
  it('should call signIn with correct credentials', async () => {
    const credentials = { email: 'test@example.com', password: 'password' };
    const expectedRes = { ok: true };
    (signIn as jest.Mock).mockResolvedValueOnce(expectedRes);

    const res = await loginUser(credentials);

    expect(signIn).toHaveBeenCalledWith('credentials', {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });
    expect(res).toEqual(expectedRes);
  });
});
