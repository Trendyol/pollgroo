import { render, screen } from '@testing-library/react';
import { DialogPopup } from './dialogPopup';
import { IconAddressBook } from '@tabler/icons-react';

jest.mock('@/molecules', () => ({
  Popup: jest.fn(({ children }) => <div id="popup">{children}</div>),
}));

describe('<DialogPopup /> specs', () => {
  it('should render dialog popup', () => {
    // act
    render(<DialogPopup show={true} title="Title Here" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." renderIcon={<IconAddressBook className="text-xl text-black text-sm lg:text-lg" />} onClose={() => {}} />);
    const alertPopupElement = screen.getByTestId('dialog-popup');
    // assert
    expect(alertPopupElement).toBeInTheDocument();
  });
});
