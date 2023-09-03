import React from 'react';
import { Button, Link, Typography } from '../../atoms';
import { LabeledInput } from '../../molecules';
import { ButtonText, DescriptionText, FooterText, HeaderText, LinkPage, LinkText } from './enums';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import translate from 'translations';
import Image from 'next/image';
import GitHubButton from 'react-github-btn';

interface FormValues {
  fullname?: string;
  email: string;
  password?: string;
}

type InputName = 'fullname' | 'email' | 'password';

export interface IProps {
  type: 'login' | 'register' | 'forgotPassword';
  onSubmit: (data: FormValues) => void;
  onGoogleSubmit?: () => void;
}

export const AuthForm = ({ type, onSubmit, onGoogleSubmit }: IProps) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required()
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'invalid email address'),
    ...(type === 'login' || type === 'register'
      ? {
          password: yup
            .string()
            .min(8, "password can't be less than 8 characters")
            .max(30, "password can't be more than 30 characters")
            .required(),
        }
      : {}),
    ...(type === 'register' ? { fullname: yup.string().required() } : {}),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    clearErrors,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data: FormValues) => {
    onSubmit(data);
  };

  const handleBlur = (fieldName: InputName) => {
    trigger(fieldName);
  };

  const handleFocus = (fieldName: InputName) => {
    clearErrors(fieldName);
  };

  const renderInput = (name: InputName, label: string, type: string) => {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <LabeledInput
            className="w-full"
            label={label}
            name={name}
            type={type}
            value={field.value}
            onChange={field.onChange}
            onBlur={() => handleBlur(name)}
            onFocus={() => handleFocus(name)}
            error={!!errors[name]?.message}
            errorMessage={errors[name]?.message}
            fluid
          />
        )}
      />
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
      <form className="flex flex-col h-full items-center gap-y-8" onSubmit={handleSubmit(submitHandler)}>
        <div className="w-full relative">
          <div>
            <Typography className="font-bold text-black" element="h4" size="xxxl">
              {HeaderText[type]}
            </Typography>
            <Typography className="mt-2.5 text-gray" element="p">
              {DescriptionText[type]}
            </Typography>
          </div>
          <div className="absolute top-1 right-0">
            <GitHubButton
              href="https://github.com/Trendyol/pollgroo"
              data-color-scheme="no-preference: light; light: light; dark: light;"
              data-size="large"
              data-show-count="true"
              aria-label="Star Trendyol/pollgroo on GitHub"
            >
              {translate('STAR')}
            </GitHubButton>
          </div>
        </div>
        {onGoogleSubmit && (
          <Button onClick={onGoogleSubmit} variant="secondary" fluid className="relative lg:hover:bg-extralightgray">
            <div className="h-11 flex gap-x-2 items-center justify-center">
              <Image
                src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                alt="Google Logo"
                width={20}
                height={20}
              />
              <Typography element="span" weight="medium" size="xs">
                {translate('GOOGLE_AUTH_TEXT')}
              </Typography>
              <Typography
                element="span"
                color="white"
                weight="semibold"
                size="xxs"
                className="bg-red p-1 rounded-lg absolute -top-3 right-3"
              >
                {translate('NEW')}
              </Typography>
            </div>
          </Button>
        )}
        {type === 'login' && (
          <Typography
            element="span"
            color="silver"
            size="xxs"
            className="flex items-center before:border-b-gray before:border-b before:flex-shrink before:flex-grow before:mr-2 after:border-b-gray after:border-b after:flex-shrink after:flex-grow after:ml-2 w-full"
          >
            {translate('AUTHFORM_OTHER_OPTION_TEXT')}
          </Typography>
        )}
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
          {translate('FORGOT_YOUR_PASSWORD')}
        </Link>
      )}
    </section>
  );
};
