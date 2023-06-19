import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameResultCardScoreBadge } from './index';

describe('GameResultScoreBadge', () => {
  it('should render the score', () => {
    render(<GameResultCardScoreBadge score={10} label='Score'/>);
    const scoreElement = screen.getByText(/Score : 10/i);
    expect(scoreElement).toBeInTheDocument();
  });

  it('should not render the score when the score prop is 0', () => {
    render(<GameResultCardScoreBadge score={0} label='Score'/>);
    const scoreElement = screen.queryByText(/Score : 0/i);
    expect(scoreElement).not.toBeInTheDocument();
  });
});
