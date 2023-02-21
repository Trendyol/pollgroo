import { Button } from 'ui';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'UI/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  text: 'Button',
  onClick: () => alert('Hello Primary!'),
};
