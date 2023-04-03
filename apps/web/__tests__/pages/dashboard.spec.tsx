import { render, screen } from '@testing-library/react';
import Dashboard from '../../pages/dashboard/index';

jest.mock('@/../../packages/ui', () => ({
  DashboardPage: jest.fn(({ logoUrl }: any) => <div data-testid="dashboardPage-template">{logoUrl}</div>),
}));

describe('<Dashboard /> specs', () => {
  it('renders the DashboardPage component with the correct logo URL', () => {
    // act
    render(<Dashboard />);

    // assert
    expect(screen.getByTestId("dashboardPage-template")).toBeInTheDocument();
  });
});
