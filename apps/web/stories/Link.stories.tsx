import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Link } from 'ui';

export default {
  title: 'UI/Link',
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  href: '#',
  children: 'Default link',
};

export const Primary = Template.bind({});
Primary.args = {
  href: '#',
  children: 'Primary link',
  color: 'primary',
};

export const Large = Template.bind({});
Large.args = {
  href: '#',
  children: 'Large link',
  size: 'xxl',
};