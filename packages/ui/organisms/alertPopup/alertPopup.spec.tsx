import { render, screen } from '@testing-library/react';
import { AlertPopup } from './alertPopup';

jest.mock('@/molecules', () => ({
  Popup: jest.fn(({ children }) => <div id="popup">{children}</div>),
}));

describe('<AlertPopup /> specs', () => {
  it('should render as success popup', () => {
    // act
    render(<AlertPopup show={true} title="Success" text="Success alert popup" onClose={() => {}} />);
    const alertPopupElement = screen.getByTestId('alert-popup');
    // assert
    expect(alertPopupElement).toBeInTheDocument();
  });

  it('should render as success popup', () => {
    // act
    render(<AlertPopup show={true} title="Success" text="Success alert popup" type="success" onClose={() => {}} />);
    const alertPopupElement = screen.getByTestId('alert-popup');
    // assert
    expect(alertPopupElement).toBeInTheDocument();
  });

  it('should render as error popup', () => {
    // act
    render(<AlertPopup show={true} title="Error" text="Error alert popup" type="error" onClose={() => {}} />);
    const alertPopupElement = screen.getByTestId('alert-popup');
    // assert
    expect(alertPopupElement).toBeInTheDocument();
  });
});
