import { Toaster } from 'ui';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'UI/Toaster',
  component: Toaster,
} as ComponentMeta<typeof Toaster>;

const Template: ComponentStory<typeof Toaster> = (args) => <Toaster {...args} />;

export const Default = Template.bind({});
Default.args = {
  show: true,
  text: "Lorem ipsum dolor sit amet.",
  onClose: () => { },
};

export const WithLongText = Template.bind({});
WithLongText.args = {
  show: true,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc egestas condimentum consectetur.",
  onClose: () => { },
};

export const Error = Template.bind({});
Error.args = {
  show: true,
  variant: "error",
  text: "Lorem ipsum dolor sit amet.",
  onClose: () => { },
};

export const Warning = Template.bind({});
Warning.args = {
  show: true,
  variant: "warning",
  text: "Lorem ipsum dolor sit amet.",
  onClose: () => { },
};
