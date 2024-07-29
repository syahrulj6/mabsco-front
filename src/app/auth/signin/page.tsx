import { SignInForm } from '@/components/auth/sign-in-form';
import React from 'react';

export const metadata = {
  title: 'Sign-In',
  description: 'UWKS.MABAR Sign-In page',
};

const SigninPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignInForm />
    </div>
  );
};

export default SigninPage;
