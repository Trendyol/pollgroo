import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LabeledScoringButtons } from './labeledScoringButtons';

describe('LabeledScoringButtons', () => {
	const scores = [{id: 1, value: "1"}, {id: 2, value: "2"}, {id: 3, value: "3"}];
	const label = 'Label'

  it('should renders the labeled scoring buttons', () => {

    render(<LabeledScoringButtons scores={scores} label={label} />);

    const labeledScoringButton = screen.getByText(label);
    expect(labeledScoringButton).toBeInTheDocument();
  });

  it('should show error message when error prop is true', () => {
    const { container } = render(<LabeledScoringButtons scores={scores} label={label} error={true} />);
    expect(container.querySelector('.bg-lightred')).toBeInTheDocument();
  });

  it('should select scoring button when click', async () => {
    const {container} = render(<LabeledScoringButtons scores={scores} label={label} />);

    const scoringButton = screen.getByText("2");
    await userEvent.click(scoringButton);
    
    expect(container.querySelector(".bg-backgroundprimary")).toBeInTheDocument();
  });

  it('should remove select when click selected scoring button again', async () => {
    const {container} = render(<LabeledScoringButtons scores={scores} label={label} />);

    const scoringButton = screen.getByText("2");
    await userEvent.click(scoringButton);
    await userEvent.click(scoringButton);
    
    expect(container.querySelector(".bg-white")).toBeInTheDocument();
  });
});
