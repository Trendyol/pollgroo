import React from 'react';
import { CreateGameModal } from 'ui';
import { ComponentStory, ComponentMeta } from '@storybook/react';


export default {
  title: 'UI/CreateGameModal',
  component: CreateGameModal,
} as ComponentMeta<typeof CreateGameModal>;

const Template: ComponentStory<typeof CreateGameModal> = () => <CreateGameModal />;

export const Default = Template.bind({});
Default.args = {};