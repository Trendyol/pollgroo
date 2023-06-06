import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScoringButton } from '@/molecules/scoring-button';

describe('ScoringButton', () => {
  const onClickHandler = jest.fn();

  it('should renders the scoring button', () => {
    const point = '1';

    render(<ScoringButton onClick={onClickHandler}>{point}</ScoringButton>);

    const scoringButton = screen.getByText(point);
    expect(scoringButton).toBeInTheDocument();
  });

  it('should render the scoring button with default props', () => {
    const point = '1';

    render(<ScoringButton onClick={onClickHandler}>{point}</ScoringButton>);

    const scoringButton = screen.getByRole('button');

    expect(scoringButton).toBeInTheDocument();
    expect(scoringButton).toHaveClass('bg-white');
  });

  it('should render called click handler once', async () => {
    const point = '1';

    render(<ScoringButton onClick={onClickHandler}>{point}</ScoringButton>);

    const scoringButton = screen.getByText('1');
    await userEvent.click(scoringButton);
    
    expect(onClickHandler).toBeCalledTimes(1);
  });

  it('should render the scoring button is selected', () => {
    const point = '1';

    render(<ScoringButton onClick={onClickHandler} variant="primary">{point}</ScoringButton>);

    const scoringButton = screen.getByRole('button');

    expect(scoringButton).toBeInTheDocument();
    expect(scoringButton).toHaveClass('bg-backgroundprimary');
  });
  it('should render the scoring button is success', () => {
    const point = '1';

    render(<ScoringButton onClick={onClickHandler} variant="success">{point}</ScoringButton>);

    const scoringButton = screen.getByRole('button');

    expect(scoringButton).toBeInTheDocument();
    expect(scoringButton).toHaveClass('bg-green/50');
  });
});
