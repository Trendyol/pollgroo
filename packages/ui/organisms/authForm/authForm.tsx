import React from 'react';
import { Button, Typography } from '../../atoms';
import { LabeledInput } from '../../molecules';
import { ButtonText, DescriptionText, HeaderText } from './enums';

interface FormValues {
  fullname?: string;
  email: string;
  password?: string;
}

export interface IProps {
  type: 'login' | 'register' | 'forgotPassword';
}

export const AuthForm = ({ type }: IProps) => {
  const getFormElements = () => {
    switch (type) {
      case 'login':
        return (
          <>
            <LabeledInput
              label="Email"
              name="email"
              type="email"
              value={''}
              onChange={() => {}}
              error={false}
              errorMessage={''}
              fluid
            />
            <LabeledInput
              label="Password"
              name="password"
              type="password"
              value={''}
              onChange={() => {}}
              error={false}
              errorMessage={''}
              fluid
            />
          </>
        );
      case 'register':
        return (
          <>
            <LabeledInput
              label="Full Name"
              name="fullname"
              type="text"
              value={''}
              onChange={() => {}}
              error={false}
              errorMessage={''}
              fluid
            />
            <LabeledInput
              label="Email"
              name="email"
              type="email"
              value={''}
              onChange={() => {}}
              error={false}
              errorMessage={''}
              fluid
            />
            <LabeledInput
              label="Password"
              name="password"
              type="password"
              value={''}
              onChange={() => {}}
              error={false}
              errorMessage={''}
              fluid
            />
          </>
        );
      case 'forgotPassword':
        return (
          <LabeledInput
            label="Email"
            name="email"
            type="email"
            value={''}
            onChange={() => {}}
            error={false}
            errorMessage={''}
            fluid
          />
        );
    }
  };

  return (
    <form className="flex flex-col gap-y-8">
      <div>
        <Typography className="font-bold text-black" element="h4" size="xl">
          {HeaderText[type]}
        </Typography>
        <Typography className="mt-2.5 text-gray" element="p">
          {DescriptionText[type]}
        </Typography>
      </div>
      {getFormElements()}
      <Button className="h-11 text-white font-bold" type="submit" fluid>
        {ButtonText[type]}
      </Button>
    </form>
  );
};

export default AuthForm;
