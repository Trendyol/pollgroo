import { render, screen } from '@testing-library/react';
import { Tooltip } from '@/atoms/tooltip';

describe('Render the tooltip', () => {
  it('should render with default props', async () => {
    const tooltipText = 'Simple Tooltip';

    render(<Tooltip renderContent={<>render content</>}><>{tooltipText}</></Tooltip>);

    const tooltip = screen.getByText(tooltipText);
    expect(tooltip).toBeInTheDocument();
  });
});
