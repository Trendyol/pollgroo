import React from 'react';
import { render } from '@testing-library/react';
import * as Translate from 'translations';
import { GameResultCard } from '../gameResultCard';

describe('GameResultCard component', () => {
  const props = {
    order: 1,
    total: 5,
    score: 80,
    text: 'Test Result',
  };

  it('should render the correct task order', () => {
    jest.spyOn(Translate, 'default').mockImplementation((arg: string) => arg);
    const { getByText } = render(<GameResultCard {...props} />);
    const taskOrder = getByText(/TASK 1\/5/i);

    expect(taskOrder).toBeInTheDocument();
  });

  it('should render the correct text', () => {
    const { getByText } = render(<GameResultCard {...props} />);
    const resultText = getByText('Test Result');
    expect(resultText).toBeInTheDocument();
  });

  it('should render GameResultScoreBadge component correctly', () => {
    jest.spyOn(Translate, 'default').mockImplementation((arg: string) => arg);
    const { getByText } = render(<GameResultCard {...props} />);
    const scoreText = getByText(/Score : 80/i);

    expect(scoreText).toBeInTheDocument();
  });
});
