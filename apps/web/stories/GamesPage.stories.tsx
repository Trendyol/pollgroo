import React from 'react';
import { GamesPage } from 'ui';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'UI/GamesPage',
  component: GamesPage,
} as ComponentMeta<typeof GamesPage>;

// Mocked data
const logoUrl = 'https://example.com/logo.png';

const Template: ComponentStory<typeof GamesPage> = (args) => <GamesPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  logoUrl: logoUrl,
};