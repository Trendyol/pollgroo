import React from 'react';
import { render } from '@testing-library/react';
import { SubNavigation } from '@/organisms';

jest.mock('@/organisms/SubNavigationProfileMenu', () => ({
  SubNavigationProfileMenu: jest.fn(({ children }) => <div id="SubNavigationProfileMenu">{children}</div>),
}));

describe('<SubNavigation /> specs', () => {
  it('renders sub navigation text', () => {
    const subNavigationText = 'Some text';
    const { getByText } = render(<SubNavigation subNavigationText={subNavigationText} />);
    const subNavigationElement = getByText(subNavigationText);
    expect(subNavigationElement).toBeInTheDocument();
  });

  it('renders chevron icon on mobile', () => {
    const subNavigationText = 'Some text';
    const { container } = render(<SubNavigation subNavigationText={subNavigationText} />);
    const chevronIconElement = container.querySelector('.absolute.ml-2.-z-10');
    expect(chevronIconElement).toBeInTheDocument();
  });
});