'use client';

import { Comment } from '@/lib/types';
import LoadingAnimation from '@/components/shared-components/LoadingAnimation';
import { useQuery } from '@tanstack/react-query';
import { getCommentsByPostId } from '@/lib/data';
import { formatDateToIndonesian } from '@/lib/Constant';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const CommentsList = ({ postId }: { postId: string }) => {
  const { data: session } = useSession();

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<Comment[], Error>({
    queryKey: ['comments', postId],
    queryFn: () => getCommentsByPostId(postId),
  });

  if (isLoading) return <LoadingAnimation />;
  if (error) return <div>Error: {error.message}</div>;
  if (!comments || comments.length === 0) return <div className="text-gray-400">Tidak ada komentar</div>;

  if (session && session.user)
    return (
      <div className=" md:px-4 w-full flex flex-col gap-5">
        {comments.map((comment: Comment) => (
          <div key={comment.id} className="flex gap-2 w-full justify-between items-start">
            <div className="flex gap-2 w-full">
              <Link href={session.user.id.toString() == comment.authorId ? `/home/profile/${comment.authorId}` : `/home/user/${comment.authorId}`}>
                <img src={comment.author.image} className="h-8 w-8 md:h-10 md:w-10 rounded-full" />
              </Link>
              <div className="flex flex-col gap-2 items-centers">
                <Link href={session.user.id.toString() == comment.authorId ? `/home/profile/${comment.authorId}` : `/home/user/${comment.authorId}`}>
                  <p className="md:text-base text-sm font-bold text-main">{comment.author.name}</p>
                </Link>
                <p className="text-sm text-gray-400">{comment.content}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm w-32">{formatDateToIndonesian(comment.createdAt)}</p>
          </div>
        ))}
      </div>
    );
};

export default CommentsList;
