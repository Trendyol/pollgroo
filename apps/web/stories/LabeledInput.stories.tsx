import { LabeledInput } from 'ui';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'UI/LabeledInput',
  component: LabeledInput,
} as ComponentMeta<typeof LabeledInput>;

const Template: ComponentStory<typeof LabeledInput> = (args) => <LabeledInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Name',
  placeholder: 'Enter your name',
};

export const WithId = Template.bind({});
WithId.args = {
  id: 'name-input',
  label: 'Name',
  placeholder: 'Enter your name',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Name',
  placeholder: 'Enter your name',
  error: true,
  errorMessage: 'This field is required',
} as any;

export const CustomClass = Template.bind({});
CustomClass.args = {
  label: 'Name',
  placeholder: 'Enter your name',
  className: 'custom-class',
};





