import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AuthPage } from 'ui';

export default {
  title: 'UI/AuthPage',
  component: AuthPage,
  argTypes: {
    type: {
      control: {
        type: 'radio',
        options: ['login', 'register', 'forgotPassword'],
      },
    },
  },
} as ComponentMeta<typeof AuthPage>;

const Template: ComponentStory<typeof AuthPage> = (args) => <AuthPage {...args} />;

export const Login = Template.bind({});
Login.args = {
  logoUrl: '/images/logo.png',
  type: 'login',
};

export const Register = Template.bind({});
Register.args = {
  logoUrl: '/images/logo.png',
  type: 'register',
};

export const ForgotPassword = Template.bind({});
ForgotPassword.args = {
  logoUrl: '/images/logo.png',
  type: 'forgotPassword',
};
