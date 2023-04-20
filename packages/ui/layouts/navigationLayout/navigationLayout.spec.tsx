import React from 'react';
import { render, screen } from '@testing-library/react';
import { NavigationLayout } from '@/layouts';

jest.mock('@/organisms', () => ({
  SubNavigation: jest.fn(({ subNavigationText }: any) => (
    <div data-testid="subnavigation-component">{subNavigationText}</div>
  )),
  Navigation: jest.fn(({ logoUrl }: any) => <div data-testid="navigation-component">{logoUrl}</div>),
}));

describe('<NavigationLayout />', () => {
  it('renders the Navigation and SubNavigation components with the correct props', () => {
    const logoUrl = 'https://example.com/logo.png';
    const subNavigationText = 'Dashboard';
    const childText = 'example';

    render(
      <NavigationLayout logoUrl={logoUrl} subNavigationText={subNavigationText}>
        {childText}
      </NavigationLayout>
    );

    expect(screen.getByTestId('subnavigation-component')).toBeInTheDocument();
    expect(screen.getByText(subNavigationText)).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });
});
