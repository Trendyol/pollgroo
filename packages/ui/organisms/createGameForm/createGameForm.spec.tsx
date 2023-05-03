import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { CreateGameForm } from './createGameForm';
import * as GameContext from 'contexts/gameContext';
import * as NextAuth from 'next-auth/react';


describe('<CreateGameForm /> specs', () => {
  let postCreateGameData: any;
  let setShowCreateGameModal: any;
  let getGameCardData: any;
  let teamOptions: any;
  let session: any;
  beforeEach(() => {
    postCreateGameData = jest.fn();
    setShowCreateGameModal = jest.fn();
    getGameCardData = jest.fn();
    teamOptions = [
      {
        _id: '12345',
        name: 'Checkout',
      },
      {
        _id: '123456',
        name: 'Disco',
      },
    ];
    session = {
      user: {
        teams: teamOptions,
      },
    };
    jest.spyOn(GameContext, 'useGame').mockReturnValue({
      postCreateGameData,
      setShowCreateGameModal,
      getGameCardData,
    } as any);
    jest.spyOn(NextAuth, 'useSession').mockReturnValue({
      data: session
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should submit the form and call the submitHandler', async () => {
    // arrange
    render(<CreateGameForm />);
    const gameTitleInput = screen.getByLabelText('Game Title');
    const teamDropdownInput = screen.getByLabelText('Team');
    const submitButton = screen.getByText('Create');

    // act
    fireEvent.change(gameTitleInput, { target: { value: 'Test Game' } });
    fireEvent.change(teamDropdownInput, { target: { value: teamOptions[1].name } });
    fireEvent.click(submitButton);

    // assert
    await waitFor(() => expect(postCreateGameData).toHaveBeenCalledWith('Test Game', teamOptions[1]._id));
    await waitFor(() => expect(setShowCreateGameModal).toHaveBeenCalledWith(false));
    await waitFor(() => expect(getGameCardData).toHaveBeenCalled());
  });

  it('should trigger handleBlur when onBlur for input', async () => {
    // act
    render(<CreateGameForm />);

    const gameTitleInput = screen.getByLabelText('Game Title');
    await act(async () => {
      gameTitleInput.focus();
      gameTitleInput.blur();
    });

    await waitFor(() => expect(screen.getByText('gameTitle is a required field')).toBeInTheDocument());
  });
});
