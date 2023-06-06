import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ScoringButton } from '@/../../packages/ui/molecules';

export default {
  title: 'UI/ScoringButton',
  component: ScoringButton,
} as ComponentMeta<typeof ScoringButton>;

const Template: ComponentStory<typeof ScoringButton> = (args) => <ScoringButton {...args} />;

export const DefaultScoringButton = Template.bind({});
DefaultScoringButton.args = {
  children: '1',
	onClick: () => alert('Hello Default Scoring Button!')
};

export const SelectedScoringButton = Template.bind({});
SelectedScoringButton.args = {
  children: '1',
  variant: "primary",
	onClick: () => alert('Hello Selected Scoring Button!')
};