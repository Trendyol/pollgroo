import React from 'react';
import { Button, Link, Typography } from '../../atoms';
import { LabeledInput } from '../../molecules';
import { ButtonText, DescriptionText, FooterText, HeaderText, LinkPage, LinkText } from './enums';
// import { useForm, Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormValues {
  fullname?: string;
  email: string;
  password?: string;
}

type InputName = 'fullname' | 'email' | 'password';

export interface IProps {
  type: 'login' | 'register' | 'forgotPassword';
  onSubmit: (data: FormValues) => void;
}

export const AuthForm = ({ type, onSubmit }: IProps) => {
  // const schema = yup.object().shape({
  //   email: yup.string().email().required(),
  //   ...(type === 'login' || type === 'register' ? { password: yup.string().required() } : {}),
  //   ...(type === 'register' ? { fullname: yup.string().required() } : {}),
  // });

  console.log(yup, useForm, yupResolver);

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors }
  //   trigger,
  //   clearErrors,
  // } = useForm<FormValues>({
  //   resolver: yupResolver(schema),
  // });


  // const submitHandler = (data: FormValues) => {
  //   console.log(data);
  //   onSubmit(data);
  // };

  // const handleBlur = (fieldName: InputName) => {
  //   trigger(fieldName);
  // };

  // const handleFocus = (fieldName: InputName) => {
  //   clearErrors(fieldName);
  // };

  const renderInput = (name: InputName, label: string, type: string) => {
    return (
      // <Controller
      //   name={name}
      //   control={control}
      //   defaultValue=""
      //   render={({ field }) => (
          <LabeledInput
            className="w-full"
            label={label}
            name={name}
            type={type}
            // value={field.value}
            // onChange={field.onChange}
            // onBlur={() => handleBlur(name)}
            // onFocus={() => handleFocus(name)}
            // error={!!errors[name]?.message}
            // errorMessage={errors[name]?.message}
            fluid
          />
        // )}
      // />
    );
  };

  const renderFormElements = () => {
    switch (type) {
      case 'login':
        return (
          <>
            {renderInput('email', 'Email', 'email')}
            {renderInput('password', 'Password', 'password')}
          </>
        );
      case 'register':
        return (
          <>
            {renderInput('fullname', 'Full Name', 'text')}
            {renderInput('email', 'Email', 'email')}
            {renderInput('password', 'Password', 'password')}
          </>
        );
      case 'forgotPassword':
        return renderInput('email', 'Email', 'email');
    }
  };

  return (
    <section id="authForm" className="h-full p-4 flex flex-col justify-between lg:flex-1">
      <form className="flex flex-col h-full items-center gap-y-8" > {/*onSubmit={handleSubmit(submitHandler)}*/}
        <div className="w-full">
          <Typography className="font-bold text-black" element="h4" size="xl">
            {HeaderText[type]}
          </Typography>
          <Typography className="mt-2.5 text-gray" element="p">
            {DescriptionText[type]}
          </Typography>
        </div>
        {renderFormElements()}
        <Button className="h-11 text-white font-bold" type="submit" fluid>
          {ButtonText[type]}
        </Button>
      </form>
      <Typography className="p-4 text-center" color="gray" element="p">
        <span>
          {FooterText[type]}
          <Link href={LinkPage[type]} color="primary">
            {LinkText[type]}
          </Link>
        </span>
      </Typography>
      {type === 'login' && (
        <Link className="text-center" href="/forgot-password" color="primary">
          Forgot your password ?
        </Link>
      )}
    </section>
  );
};