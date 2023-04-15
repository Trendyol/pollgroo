import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GameResultCard } from 'ui';

export default {
  title: 'UI/GameResultCard',
  component: GameResultCard,
} as ComponentMeta<typeof GameResultCard>;

const Template: ComponentStory<typeof GameResultCard> = (args) => <GameResultCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  score: 1,
  order: 2,
  total: 3,
  text: 'Example Task Description',
};
