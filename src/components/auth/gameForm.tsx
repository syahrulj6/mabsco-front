'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { GAMES, GameSchema } from '@/schemas';
import { Backend_URL } from '@/lib/Constant';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { CustomToken } from '@/lib/types';

type InputType = z.infer<typeof GameSchema>;

export const GameForm = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (!session) router.push('/auth/signin');

  const userId = session?.user.id.toString();

  console.log(userId);

  const form = useForm<z.infer<typeof GameSchema>>({
    resolver: zodResolver(GameSchema),
    defaultValues: {
      gameTitle: GAMES.VALORANT,
      gameId: '',
      username: '',
      userId,
    },
  });

  const saveGame = async (data: InputType) => {
    const { ...game } = data;
    try {
      const res = await fetch(Backend_URL + '/game', {
        method: 'POST',
        body: JSON.stringify(game),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        alert(res.statusText);
        return;
      }

      // Trigger revalidation
      router.push(`/home`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && (session.user as CustomToken['user']).onboarded) {
      router.push('/home');
    }
  }, [status, session, router]);

  return (
    <div className="w-full flex flex-col ">
      <div className="flex flex-col gap-2 mt-8 -mb-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(saveGame)}>
            <div className="flex w-full flex-col space-y-3 py-4">
              <FormField
                control={form.control}
                name="gameTitle"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={(value) => form.setValue('gameTitle', value as GAMES)} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Your Games" />
                      </SelectTrigger>
                      <SelectContent className="">
                        <SelectItem value={GAMES.VALORANT}>VALORANT</SelectItem>
                        <SelectItem value={GAMES.MOBILE_LEGENDS}>MOBILE LEGENDS</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Username" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gameId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Id game" {...field} type="text" />
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
    </div>
  );
};
