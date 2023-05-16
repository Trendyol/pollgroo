import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '@/pages/register';
import * as nextRouter from 'next/router';
import * as AppContext from 'contexts/appContext';
import axios from 'axios';

jest.mock('axios');

jest.mock('contexts/appContext', () => ({
  useApp: jest.fn().mockReturnValue(() => ({ setShowLoader: jest.fn() }))
}));

jest.mock('@/helpers/loginUser', () => {
  return jest.fn().mockResolvedValue({ ok: true });
});

jest.mock('@/../../packages/ui', () => ({
  Loader: jest.fn(() => <div data-testid="loader"></div>),
  AuthPage: jest.fn(({ logoUrl, type, onSubmit }: any) => {
    const handleSubmit = (event: any) => {
      event.preventDefault();
      onSubmit({ fullname: 'test', email: 'test@example.com', password: 'password' });
    };

    return (
      <div data-testid="register-authPage-template">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullname-input">Fullname</label>
          <input id="fullname-input" type="text" name="fullname" />
          <label htmlFor="email-input">Email</label>
          <input id="email-input" type="email" name="email" />
          <label htmlFor="password-input">Password</label>
          <input id="password-input" type="password" name="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }),
}));

describe('<Register /> specs', () => {
  let routerPush: any;
  let setShowLoader: any;

  beforeEach(() => {
    setShowLoader = jest.fn();
    routerPush = jest.fn();
    jest.spyOn(nextRouter, 'useRouter').mockImplementation(() => ({ push: routerPush } as any));
    jest.spyOn(AppContext, 'useApp').mockReturnValue({
      setShowLoader,
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render authPage template', () => {
    // act
    render(<Register />);

    // assert
    expect(screen.getByTestId('register-authPage-template')).toBeInTheDocument();
  });
  it('should submit the form with email, fullname and password', async () => {
    // assign
    const mockResponse = { data: { success: true } };
    axios.post.mockResolvedValueOnce(mockResponse);
    // act
    render(<Register />);
    fireEvent.submit(screen.getByTestId('register-authPage-template').querySelector('form')!);
    await waitFor(() => {});
    // assert
    expect(routerPush).toHaveBeenCalledWith('/dashboard');
  });
});
