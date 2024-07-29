import { SignUpForm } from '@/components/auth/sign-up-form';

export const metadata = {
  title: 'Sign-Up',
  description: 'UWKS.MABAR Sign-Up page',
};

const SigUpPage = () => {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <SignUpForm />
    </div>
  );
};

export default SigUpPage;
