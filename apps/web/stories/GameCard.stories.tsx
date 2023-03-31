import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GameCard } from 'ui';

export default {
  title: 'UI/GameCard',
  component: GameCard,
} as ComponentMeta<typeof GameCard>;

const Template: ComponentStory<typeof GameCard> = (args) => <GameCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  teamName: 'Team A',
  gameTitle: 'Game 1',
};

export const Done = Template.bind({});
Done.args = {
  teamName: 'Team B',
  gameTitle: 'Game 2',
  isDone: true,
};