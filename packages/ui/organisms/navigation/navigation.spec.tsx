import { render, screen, fireEvent } from '@testing-library/react';
import * as nextRouter from 'next/router';
import { Navigation } from './navigation';
import { NAVIGATION_ITEMS } from './navigationItems';

describe('<Navigation /> specs', () => {
  let logoUrl: string;
  beforeEach(() => {
    (nextRouter.useRouter as any) = jest.fn();
    (nextRouter.useRouter as any).mockImplementation(() => ({ route: '/' }));
    logoUrl = 'exampleUrl.svg';
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render logoUrl', () => {
    // act
    render(<Navigation logoUrl={logoUrl} />);
    const imageElement = screen.getByAltText('Pollgroo');

    // assert
    expect(imageElement).toHaveAttribute('src', logoUrl);
  });

  it('should render links correctly', () => {
    // act
    render(<Navigation logoUrl={logoUrl} />);

    // assert
    NAVIGATION_ITEMS.forEach((item) => {
      expect(screen.getByText(item.text)).toBeInTheDocument();
    });
  });

  it('should open menu in mobile view when toggle menu-icon', () => {
    // act
    const { container } = render(<Navigation logoUrl={logoUrl} />);
    const menuIcon = screen.getByTestId('menu-icon');
    fireEvent.click(menuIcon);

    // assert
    expect(container.querySelector('.translate-y-0')).toBeInTheDocument();
  });

  it('should close menu in mobile view when toggle menu-close-icon', () => {
    // act
    const { container } = render(<Navigation logoUrl={logoUrl} />);
    const menuIcon = screen.getByTestId('menu-icon');
    fireEvent.click(menuIcon);
    const menuCloseIcon = screen.getByTestId('menu-close-icon');
    fireEvent.click(menuCloseIcon);

    // assert
    expect(container.querySelector('.translate-y-0')).not.toBeInTheDocument();
  });

  it('should render element with active view', () => {
    // assign
    (nextRouter.useRouter as any).mockImplementation(() => ({ pathname: '/dashboard' }));
    // act
    const { container } = render(<Navigation logoUrl={logoUrl} />);
    const activeElement = container.querySelector('.active');
    // assert
    expect(activeElement).toHaveTextContent('Dashboard');
  });
});
