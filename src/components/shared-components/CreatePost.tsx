'use client';

import { Backend_URL } from '@/lib/Constant';
// import { createPost } from '@/lib/data';
import { PostSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

type InputType = z.infer<typeof PostSchema>;

const Post = ({ session }: any) => {
  const router = useRouter();
  const userId = session?.user.id.toString();

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: '',
      authorId: userId,
    },
  });

  const savePost = async (data: InputType) => {
    const { ...post } = data;
    try {
      const res = await fetch(Backend_URL + '/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Postingan berhasil dibuat',
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(savePost)}>
        <FormField
          control={form.control} // Remove if useFormContext is not used
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Isi pesan" {...field} className="h-52 md:h-72" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-2 transition-colors duration-200 bg-white text-inherit hover:bg-white/70">
          Post
        </Button>
      </form>
    </Form>
  );
};

export default Post;
