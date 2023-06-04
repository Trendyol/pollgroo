import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Popup } from 'ui';

export default {
  title: 'UI/Popup',
  component: Popup,
} as ComponentMeta<typeof Popup>;

const Template: ComponentStory<typeof Popup> = (args) => <Popup {...args} />;

export const Default = Template.bind({});
Default.args = {
  show: true,
  title: 'Example Popup',
  children: <p>This is the content of the popup.</p>,
  onClose: () => {},
};

export const WithLongHeaderTitle = Template.bind({});
WithLongHeaderTitle.args = {
  show: true,
  title: 'This is a very long title for a popup',
  children: <p>This is the content of the popup.</p>,
  onClose: () => {},
};

export const WithoutHeaderTitle = Template.bind({});
WithoutHeaderTitle.args = {
  show: true,
  children: <p>This is the content of the popup.</p>,
  onClose: () => {},
};

export const WithoutCloseButton = Template.bind({});
WithoutCloseButton.args = {
  show: true,
  title: 'This is a very long title for a popup',
  showCloseButton: false,
  children: <p>This is the content of the popup.</p>,
  onClose: () => {},
};

export const WithoutHeader = Template.bind({});
WithoutHeader.args = {
  show: true,
  showCloseButton: false,
  children: <p>This is the content of the popup.</p>,
  onClose: () => {},
};

export const Hidden = Template.bind({});
Hidden.args = {
  show: false,
  title: 'Hidden Popup',
  children: <p>This popup is not visible.</p>,
  onClose: () => {},
};
