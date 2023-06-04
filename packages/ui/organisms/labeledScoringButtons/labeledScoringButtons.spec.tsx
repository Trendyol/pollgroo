import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LabeledScoringButtons } from './labeledScoringButtons';

describe('LabeledScoringButtons', () => {
  const scores = [1, 2, 3, 4, 5];
  const label = 'Label';
  const mockGetValues = jest.fn().mockReturnValue({ performance: 10 });
  const mockSetValue = jest.fn();

  it('should renders the labeled scoring buttons', () => {
    render(
      <LabeledScoringButtons scores={scores} label={label} name={label} getValues={mockGetValues} setValue={mockSetValue} />
    );

    const labeledScoringButton = screen.getByText(label);
    expect(labeledScoringButton).toBeInTheDocument();
  });

  it('should show error message when error prop is true', () => {
    const { container } = render(
      <LabeledScoringButtons
        scores={scores}
        label={label}
        name={label}
        getValues={mockGetValues}
        setValue={mockSetValue}
        error={true}
      />
    );
    expect(container.querySelector('.bg-lightred')).toBeInTheDocument();
  });

  it('should select scoring button when click', async () => {
    const { container } = render(
      <LabeledScoringButtons scores={scores} label={label} name={label} getValues={mockGetValues} setValue={mockSetValue} />
    );

    const scoringButton = screen.getByText('2');
    await userEvent.click(scoringButton);

    expect(mockSetValue).toHaveBeenCalledWith(label, 2)
  });

  it('should remove select when click selected scoring button again', async () => {
    const { container } = render(
      <LabeledScoringButtons scores={scores} label={label} name={label} getValues={mockGetValues} setValue={mockSetValue} />
    );

    const scoringButton = screen.getByText('2');
    await userEvent.click(scoringButton);
    await userEvent.click(scoringButton);

    expect(container.querySelector('.bg-white')).toBeInTheDocument();
  });
});
