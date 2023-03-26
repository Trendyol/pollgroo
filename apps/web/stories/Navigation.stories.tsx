import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Navigation } from 'ui';

export default {
  title: 'UI/Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>;

const Template: ComponentStory<typeof Navigation> = (args) => <Navigation {...args} />;

export const Default = Template.bind({});
Default.args = {
  logoUrl: 'https://via.placeholder.com/125x100',
};
