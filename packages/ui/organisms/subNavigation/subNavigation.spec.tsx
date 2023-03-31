import React from 'react';
import { render } from '@testing-library/react';
import { SubNavigation } from '@/organisms';

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