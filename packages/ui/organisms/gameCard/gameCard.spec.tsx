import React from 'react';
import { render } from '@testing-library/react';
import { GameCard } from '@/organisms';

describe('<GameCard /> specs', () => {
  const props = {
    teamName: 'STOREFRONT CHECKOUT',
    gameTitle: 'TECH GROOMING',
  };

  it('renders team name and game title', () => {
    const { getByText } = render(<GameCard {...props} />);
    expect(getByText(props.teamName)).toBeInTheDocument();
    expect(getByText(props.gameTitle)).toBeInTheDocument();
  });

  it('renders View and Edit buttons', () => {
    const { getByText } = render(<GameCard {...props} />);
    expect(getByText('View')).toBeInTheDocument();
    expect(getByText('Edit')).toBeInTheDocument();
  });
});
