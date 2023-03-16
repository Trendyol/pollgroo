import { Typography } from 'ui';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'UI/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => <Typography {...args}>{args.children}</Typography>;

export const Default = Template.bind({});

Default.args = {
  children: "This is a example typography text",
  element: "h1"
};