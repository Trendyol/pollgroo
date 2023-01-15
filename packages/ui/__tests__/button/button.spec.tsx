import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/button';

describe('Render the button', () => {
  const onClickHandler = jest.fn();

  afterEach(() => {
    onClickHandler.mockClear();
  });

  it('should render with default props', async () => {
    const buttonText = 'Simple Button';

    render(<Button onClick={onClickHandler} />);

    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  it('should render with custom text', async () => {
    const buttonText = 'Button Text';

    render(<Button text={buttonText} onClick={onClickHandler} />);

    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();
  });
});

describe('Click the button', () => {
  const onClickHandler = jest.fn();

  afterEach(() => {
    onClickHandler.mockClear();
  });

  it('should called click handler once', async () => {
    render(<Button onClick={onClickHandler} />);

    const button = screen.getByText('Simple Button');
    await userEvent.click(button);

    expect(onClickHandler).toBeCalledTimes(1);
  });

  it('should called click handler 3 times', async () => {
    render(<Button onClick={onClickHandler} />);

    const button = screen.getByText('Simple Button');
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);

    expect(onClickHandler).toBeCalledTimes(3);
  });
});
