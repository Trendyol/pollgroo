import { Input } from 'ui';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'UI/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter your text here',
};

export const WithError = Template.bind({});
WithError.args = {
  placeholder: 'Enter your text here',
  error: true,
  errorMessage: 'This field is required',
};

export const Fluid = Template.bind({});
Fluid.args = {
  placeholder: 'Enter your text here',
  fluid: true,
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  placeholder: 'Enter your text here',
  className: 'custom-class',
};