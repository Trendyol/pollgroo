import React from 'react';
import { Button } from 'ui';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'UI/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>{args.children}</Button>;

export const Primary = Template.bind({});

Primary.args = {
  variant: "primary",
  children: "Click !",
  onClick: () => alert('Hello Primary!'),
};
