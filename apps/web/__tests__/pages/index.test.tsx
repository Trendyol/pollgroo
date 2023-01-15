import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home page', () => {
  it('should render heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: 'Home Page',
    });

    expect(heading).toBeInTheDocument();
  });
});
