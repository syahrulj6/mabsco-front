'use client';

import { Backend_URL } from '@/lib/Constant';
import { CommentSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

type InputType = z.infer<typeof CommentSchema>;

export const CommentsForm = ({ postId }: { postId: string }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const userId = session?.user.id.toString();

  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: '',
      authorId: userId,
      postId,
    },
  });

  const saveComment = async (data: InputType) => {
    const { ...post } = data;
    try {
      const res = await fetch(Backend_URL + `/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Komentar berhasil dibuat',
        showConfirmButton: false,
        timer: 1500,
      });

      router.push('/home');
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(saveComment)}>
          <FormField
            control={form.control} // Remove if useFormContext is not used
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Isi pesan" {...field} className="h-8 md:h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="text-black w-full mt-2 transition-colors duration-200 bg-white  hover:bg-white/70">
            Kirim
          </Button>
        </form>
      </Form>
    </div>
  );
};
