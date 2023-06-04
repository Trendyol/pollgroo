import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LabeledScoringButtons } from '@/../../packages/ui/organisms/labeledScoringButtons';

export default {
  title: 'UI/LabeledScoringButtons',
  component: LabeledScoringButtons,
} as ComponentMeta<typeof LabeledScoringButtons>;

const Template: ComponentStory<typeof LabeledScoringButtons> = (args) => <LabeledScoringButtons {...args} />;

const scores = [1, 2, 3, 4, 5]

export const Default = Template.bind({});
Default.args = {
	scores,
	label: "Performance"
};

export const WithError = Template.bind({});
WithError.args = {
	scores,
	label: "Performance",
	error: true,
	errorMessage: "You should choose a point to be ready"
};