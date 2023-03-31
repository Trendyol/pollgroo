import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SubNavigation } from 'ui';

export default {
  title: 'UI/SubNavigation',
  component: SubNavigation,
} as ComponentMeta<typeof SubNavigation>;

const Template: ComponentStory<typeof SubNavigation> = (args) => <SubNavigation {...args} />;

export const Default = Template.bind({});
Default.args = {
  subNavigationText: 'Sub Navigation Text',
};
