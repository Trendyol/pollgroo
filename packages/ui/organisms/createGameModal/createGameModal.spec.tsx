import React from 'react';
import { render, screen } from '@testing-library/react';
import { CreateGameModal } from './createGameModal';

jest.mock('@/molecules', () => ({
  Modal: jest.fn(({ children }) => <div id="modal">{children}</div>),
}));

jest.mock('@/organisms', () => ({
  CreateGameForm: jest.fn(() => <div data-testid="create-game-form"></div>),
}));

describe('<CreateGameModal /> specs', () => {
  it('should render as expected', () => {
    // act
    render(<CreateGameModal />);
    const createGameFormElement = screen.getByTestId('create-game-form');
    // assert
    expect(createGameFormElement).toBeInTheDocument();
  });
});
