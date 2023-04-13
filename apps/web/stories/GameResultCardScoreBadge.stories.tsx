import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GameResultCardScoreBadge } from 'ui';

export default {
  title: 'UI/GameResultCardScoreBadge',
  component: GameResultCardScoreBadge,
} as ComponentMeta<typeof GameResultCardScoreBadge>;

const Template: ComponentStory<typeof GameResultCardScoreBadge> = (args) => <GameResultCardScoreBadge {...args} />;

export const Default = Template.bind({});
Default.args = {
  score: 3,
};
