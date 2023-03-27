import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';

describe('Home page', () => {
  it('should render heading', () => {
    // act
    render(<Home />);

    // assert
    expect(screen.getByText('A new perspective on driving business')).toBeInTheDocument();
  });
});
