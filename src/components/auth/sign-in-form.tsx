'use client';
import * as z from 'zod';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm } from 'react-hook-form'; // Remove Controller import if not used
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FormCard } from './form-card';
import Swal from 'sweetalert2';

type InputType = z.infer<typeof LoginSchema>;

interface SignUpFormProps {
  callbackUrl?: string;
}

export const SignInForm = ({ callbackUrl }: SignUpFormProps) => {
  const router = useRouter();
  let timerInterval: any;

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn('credentials', {
      redirect: false,
      username: data.email,
      password: data.password,
    });

    if (!result?.ok) {
      Swal.fire({
        title: 'Email atau Password yang anda masukkan salah!',
        html: 'Ditutup dalam <b></b> milliseconds.',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const popup = Swal.getPopup();
          if (popup) {
            const timer = popup.querySelector('b');
            if (timer) {
              timerInterval = setInterval(() => {
                const timerLeft = Swal.getTimerLeft();
                if (timerLeft !== undefined) {
                  timer.textContent = `${timerLeft}`;
                }
              }, 100);
            } else {
              console.error('Timer element is null');
            }
          } else {
            console.error('Popup is null');
          }
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
      return;
    }
    router.push(callbackUrl ? callbackUrl : '/onboarding');
  };

  return (
    <FormCard
      backButtonHref="/auth/signup"
      backButtonLabel="Belum Punya Akun?"
      headerLabel="Masuk"
      children={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" flex w-full flex-col space-y-4 p-4">
              <FormField
                control={form.control} // Remove if useFormContext is not used
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control} // Remove if useFormContext is not used
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Password" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="bg-white text-inherit hover:bg-white/70">
                Sign in
              </Button>
              <p className="text-center text-lg  text-white">Atau</p>
              <Button type="submit" className="flex gap-2 bg-white text-inherit hover:bg-white/70">
                Masuk dengan Google <Image src={'/icons/google.png'} alt="icon" width={20} height={20} />
              </Button>
            </div>
          </form>
        </Form>
      }
    />
  );
};
