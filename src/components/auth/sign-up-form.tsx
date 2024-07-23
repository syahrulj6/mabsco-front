'use client';
import * as z from 'zod'; // Import useState if not already imported

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form'; // Remove Controller import if not used
import { SignUpSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FormCard } from './form-card';
import { Backend_URL } from '@/lib/Constant';

type InputType = z.infer<typeof SignUpSchema>;

export const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const saveUser = async (data: InputType) => {
    const { ...user } = data;
    try {
      const res = await fetch(Backend_URL + '/auth/register', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        alert(res.statusText);
        return;
      }

      router.push('/auth/signin');
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormCard
      backButtonHref="/auth/signin"
      backButtonLabel="Sudah Punya Akun?"
      headerLabel="Daftar"
      children={
        <Form {...form}>
          <form onSubmit={form.handleSubmit(saveUser)}>
            <div className=" flex w-full flex-col space-y-4 p-4">
              <FormField
                control={form.control} // Remove if useFormContext is not used
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                Sign up
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
