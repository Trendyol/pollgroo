import { Tooltip } from 'ui';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'UI/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
  placement: "top",
  children: <div>Lorem ipsum dolor sit amet.</div>,
};
