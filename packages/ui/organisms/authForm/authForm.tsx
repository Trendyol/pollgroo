import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

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
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    ...(type === 'login' || type === 'register' ? { password: yup.string().required() } : {}),
    ...(type === 'register' ? { fullname: yup.string().required() } : {}),
  });
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
      fullname: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      onSubmit(values);
    },
  });
  console.log(formik);
  return <div>formik</div>;
};
