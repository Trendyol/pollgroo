import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AuthForm } from 'ui';

export default {
  title: 'UI/AuthForm',
  component: AuthForm,
} as ComponentMeta<typeof AuthForm>;

const Template: ComponentStory<typeof AuthForm> = (args) => <AuthForm {...args} />;

export const Login = Template.bind({});
Login.args = {
  type: 'login',
};

export const Register = Template.bind({});
Register.args = {
  type: 'register',
};

export const ForgotPassword = Template.bind({});
ForgotPassword.args = {
  type: 'forgotPassword',
};
