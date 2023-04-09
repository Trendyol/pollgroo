import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropdown } from 'ui';

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: [
    { id: 1, value: 'Option 1' },
    { id: 2, value: 'Option 2' },
    { id: 3, value: 'Option 3' },
  ],
  children: 'Select an option',
};

export const Fluid = Template.bind({});
Fluid.args = {
  options: [
    { id: 1, value: 'Option 1' },
    { id: 2, value: 'Option 2' },
    { id: 3, value: 'Option 3' },
  ],
  children: 'Select an option',
  fluid: true,
};

export const WithError = Template.bind({});
WithError.args = {
  options: [
    { id: 1, value: 'Option 1' },
    { id: 2, value: 'Option 2' },
    { id: 3, value: 'Option 3' },
  ],
  children: 'Select an option',
  error: true,
  errorMessage: 'Please select an option',
};
