'use client';

import { Post } from '@/lib/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { getAllPostByAuthorId, deletePost } from '@/lib/data';
import LoadingAnimation from '../LoadingAnimation';
import { formatDateToIndonesian } from '@/lib/Constant';
import { Button } from '@/components/ui/button';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useSession } from 'next-auth/react';

const PostsByAuthor = ({ authorId }: { authorId: string }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ['posts', authorId],
    queryFn: () => getAllPostByAuthorId(authorId),
  });

  const handleDelete = async (postId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deletePost(postId);
        await Swal.fire({
          title: 'Berhasil dihapus!',
          text: 'Postingan kamu sudah terhapus.',
          icon: 'success',
        });
        queryClient.invalidateQueries({ queryKey: ['posts', authorId] }); // Ensure correct type here
      } catch (error) {
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to delete post.',
          icon: 'error',
        });
      }
    }
  };

  if (isLoading) return <LoadingAnimation />;
  if (error) return <div>Error: {error.message}</div>;
  if (!posts || posts.length === 0) return <div>No posts found</div>;

  return (
    <div className="md:mt-6 mt-3">
      {posts.map((post: Post) => (
        <div key={post.id} className="mb-10">
          <div className="flex items-center space-x-4">
            <img src={post.author.image} alt="User" className="rounded-full md:w-14 md:h-14 w-10 h-10" />
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <h3 className="text-base md:text-lg text-main font-bold">{post.author.name}</h3>
                <span className="text-sm md:text-base text-gray-400">{formatDateToIndonesian(post.createdAt)}</span>
                {session?.user.id.toString() === post.author.id && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button onClick={() => handleDelete(post.id)}>
                          <MdDelete className="w-6 h-6 text-red-500 hover:text-red-600 transition-colors duration-150" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-red-300">
                        <p className="text-red-600">Delete Post</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <p className="text-main text-lg">{post.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsByAuthor;
