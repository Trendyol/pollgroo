import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LabeledDropdown } from 'ui';

export default {
  title: 'UI/LabeledDropdown',
  component: LabeledDropdown,
} as ComponentMeta<typeof LabeledDropdown>;

const options = [
  { id: 1, value: 'Option 1' },
  { id: 2, value: 'Option 2' },
  { id: 3, value: 'Option 3' },
];

const Template: ComponentStory<typeof LabeledDropdown> = (args) => <LabeledDropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Dropdown Label',
  options,
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Dropdown Label',
  options,
  error: true,
  errorMessage: 'This field is required',
};