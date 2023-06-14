import { render, screen } from '@testing-library/react';
import { Tooltip } from '@/atoms/tooltip';

describe('Render the tooltip', () => {
  it('should render with default props', async () => {
    const tooltipText = 'Simple Tooltip';

    render(<Tooltip>{tooltipText}</Tooltip>);

    const tooltip = screen.getByText(tooltipText);
    expect(tooltip).toBeInTheDocument();
  });
});
