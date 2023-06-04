import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconAddressBook } from '@tabler/icons-react';
import { DialogPopup, Button } from 'ui';

export default {
  title: 'UI/DialogPopup',
  component: DialogPopup,
} as ComponentMeta<typeof DialogPopup>;

const Template: ComponentStory<typeof DialogPopup> = (args) => <DialogPopup {...args} />;

export const Default = Template.bind({});
Default.args = {
  show: true,
  title:"Title Here",
  text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  renderIcon:<IconAddressBook className="text-xl text-black text-sm lg:text-lg" />,
  onClose: () => { },
};

export const DialogPopupWithChildren = Template.bind({});
Default.args = {
  show: true,
  title:"Title Here",
  text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  renderIcon:<IconAddressBook className="text-xl text-black text-sm lg:text-lg" />,
  children: <Button className="h-11 text-white font-bold" type="submit" fluid>Try Again</Button>,
  onClose: () => { },
};
