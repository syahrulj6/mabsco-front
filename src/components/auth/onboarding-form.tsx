'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ProfileSchema, GAMES } from '@/schemas';
import { Backend_URL } from '@/lib/Constant';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

import { useEdgeStore } from '@/lib/edgestore';
import { useSession } from 'next-auth/react';
import { CustomToken } from '@/lib/types';
import { getUser } from '@/lib/data';

type InputType = z.infer<typeof ProfileSchema>;

export const OnboaringForm = () => {
  const { edgestore } = useEdgeStore();
  const { data: session, status } = useSession();
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const userId = session?.user.id.toString();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      bio: '',
      image: '',
      onboarded: true,
    },
  });

  const saveProfile = async (data: InputType) => {
    const { ...profile } = data;

    try {
      const res = await fetch(Backend_URL + `/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(profile),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        alert(res.statusText);
        return;
      }

      console.log('Profile updated successfully');
      await router.push(`/game/${userId}`);
      console.log('Redirect triggered');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      if (!(session.user as CustomToken['user']).onboarded) {
        router.push('/onboarding');
      } else {
        router.push('/home');
      }
    }
  }, [status, session, router]);

  return (
    <div className="w-full flex flex-col ">
      <div className="flex flex-col gap-2 mt-8 -mb-2">
        <p className="text-main">Profile picture</p>
        <Input
          className="text-main"
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
        <button
          className="w-full bg-main py-2 text-sm border-2 rounded  border-slate-200 hover:bg-slate-200 transition-all duration-100"
          onClick={async () => {
            if (file) {
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  setProgress(progress);
                },
              });

              // pass value to img formaction
              form.setValue('image', res.url);
            }
          }}
        >
          Upload
        </button>
        <div className="h-2 overflow-hidden w-full rounded">
          <div className="h-full bg-main transition-all duration-150" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(saveProfile)}>
          <div className="flex w-full flex-col space-y-3 py-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input {...field} placeholder="Picture" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-third text-main  hover:bg-white hover:text-inherit ">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
