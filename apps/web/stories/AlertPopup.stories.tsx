import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AlertPopup, Button } from 'ui';

export default {
  title: 'UI/AlertPopup',
  component: AlertPopup,
} as ComponentMeta<typeof AlertPopup>;

const Template: ComponentStory<typeof AlertPopup> = (args) => <AlertPopup {...args} />;

export const Default = Template.bind({});
Default.args = {
  show: true,
  type: "success",
  title: "Success",
  text: "Lorem ipsum lorem ipsum",
  onClose: () => { },
};

export const ErrorAlertPopup = Template.bind({});
ErrorAlertPopup.args = {
  show: true,
  type: "error",
  title: "Error",
  text: "Lorem ipsum lorem ipsum",
  onClose: () => { },
};

export const ErrorAlertPopupWithButton = Template.bind({});
ErrorAlertPopupWithButton.args = {
  show: true,
  type: "error",
  title: "Error",
  text: "Lorem ipsum lorem ipsum",
  children: <Button className="h-11 text-white font-bold" type="submit" fluid>
    Try Again
  </Button>,
  onClose: () => { },
};