import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LabeledScoringButtons } from '@/../../packages/ui/organisms/labeledScoringButtons';

export default {
  title: 'UI/LabeledScoringButtons',
  component: LabeledScoringButtons,
} as ComponentMeta<typeof LabeledScoringButtons>;

const Template: ComponentStory<typeof LabeledScoringButtons> = (args) => <LabeledScoringButtons {...args} />;

const scores = [
	{ id: 1, value: "1" }, 
	{ id: 2, value: "2" }, 
	{ id: 3, value: "3" },
	{ id: 4, value: "4" },
	{ id: 5, value: "5" }
]

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