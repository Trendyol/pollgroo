import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal } from 'ui';

export default {
  title: 'UI/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  show: false,
  title: 'Example Modal',
  children: <p>This is the content of the modal.</p>,
  onClose: () => {},
};

export const WithLongTitle = Template.bind({});
WithLongTitle.args = {
  show: false,
  title: 'This is a very long title for a modal',
  children: <p>This is the content of the modal.</p>,
  onClose: () => {},
};

export const Hidden = Template.bind({});
Hidden.args = {
  show: false,
  title: 'Hidden Modal',
  children: <p>This modal is not visible.</p>,
  onClose: () => {},
};
