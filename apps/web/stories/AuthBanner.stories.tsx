import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AuthBanner } from 'ui';

export default {
  title: 'UI/AuthBanner',
  component: AuthBanner,
} as ComponentMeta<typeof AuthBanner>;

const Template: ComponentStory<typeof AuthBanner> = (args) => <AuthBanner {...args} />;

export const Default = Template.bind({});
Default.args = {
  logoUrl: '/images/logo.png',
};
