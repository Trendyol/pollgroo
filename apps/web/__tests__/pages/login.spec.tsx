import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '@/pages/login';
import * as nextRouter from 'next/router';
import * as AppContext from 'contexts/appContext';

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
      onSubmit({ email: 'test@example.com', password: 'password' });
    };

    return (
      <div data-testid="login-authPage-template">
        <form onSubmit={handleSubmit}>
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

describe('<Login /> specs', () => {
  let routerPush: any;
  let exampleUrl = "example.url";
  let setShowLoader: any;

  beforeEach(() => {
    routerPush = jest.fn();
    setShowLoader = jest.fn();
    jest.spyOn(nextRouter, 'useRouter').mockImplementation(() => ({ push: routerPush, query: { callbackUrl: exampleUrl} } as any));
    jest.spyOn(AppContext, 'useApp').mockReturnValue({
      setShowLoader,
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render authPage template', () => {
    // act
    render(<Login />);
    // assert
    expect(screen.getByTestId('login-authPage-template')).toBeInTheDocument();
  });

  it('should submit the form with email and password', async () => {
    // act
    render(<Login />);
    fireEvent.submit(screen.getByTestId('login-authPage-template').querySelector('form')!);
    await waitFor(() => {});
    // assert
    expect(routerPush).toHaveBeenCalledWith(exampleUrl);
  });

  it('should submit the form with email and password and redirect dashboard', async () => {
    // assign
    jest.spyOn(nextRouter, 'useRouter').mockImplementation(() => ({ push: routerPush, query: { callbackUrl: undefined} } as any));
    // act
    render(<Login />);
    fireEvent.submit(screen.getByTestId('login-authPage-template').querySelector('form')!);
    await waitFor(() => {});
    // assert
    expect(routerPush).toHaveBeenCalledWith('/dashboard');
  });

});
