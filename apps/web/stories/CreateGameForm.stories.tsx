import React from 'react';
import { CreateGameForm } from 'ui';
import { ComponentStory, ComponentMeta } from '@storybook/react';


export default {
  title: 'UI/CreateGameForm',
  component: CreateGameForm,
} as ComponentMeta<typeof CreateGameForm>;

const Template: ComponentStory<typeof CreateGameForm> = () => <CreateGameForm />;

export const Default = Template.bind({});
Default.args = {};