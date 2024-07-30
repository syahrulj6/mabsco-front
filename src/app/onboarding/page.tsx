import { OnboaringForm } from '@/components/auth/onboarding-form';
import { getUser } from '@/lib/data';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Onboarding',
  description: 'UWKS.MABAR Onboarding page',
};

const OnboardingPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex w-2/4  bg-secondary py-12 px-12 rounded-lg gap-7">
        <div className="flex flex-1 flex-col">
          <h1 className="text-main text-xl md:text-2xl font-semibold md:w-80">Isi profil untuk berinteraksi dengan mahasiswa lain &#128075;</h1>
          <OnboaringForm />
        </div>
      </div>
    </div>
  );
};

const Redirect = () => {
  if (typeof window !== 'undefined') {
    // Use client-side routing to redirect
    window.location.href = '/home';
  }
  return null;
};

export default OnboardingPage;
