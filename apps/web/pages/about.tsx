import React from 'react';
import { useForm } from 'react-hook-form';
import { useFormik } from 'formik';
import { AuthForm } from '@/../../packages/ui';

export default function AboutPage() {
  console.log('useForm --->', useForm);
  console.log('useFormik --->', useFormik({} as any));
  return (
    <div>
      <h1>About Page</h1>
      <AuthForm onSubmit={() => {}} type="forgotPassword" />
    </div>
  );
}
