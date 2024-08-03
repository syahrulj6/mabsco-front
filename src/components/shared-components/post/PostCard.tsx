'use client';

import { getAllPost } from '@/lib/data';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

import { formatDateToIndonesian } from '@/lib/Constant';
import { FaRegComments } from 'react-icons/fa6';
import { CiShare2 } from 'react-icons/ci';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import CommentsList from '@/components/shared-components/comment/CommentList';
import { Post } from '@/lib/types';

const PostCard = () => {
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const { data: session } = useSession();

  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPost,
  });

  const toggleComments = (postId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (session && session.user)
    return (
      <>
        {posts &&
          posts.map((post: Post) => {
            return (
              <>
                <div className="flex gap-3  ">
                  <Link href={session.user.id.toString() === post.authorId ? `/home/profile/${post.authorId}` : `/home/user/${post.authorId}`}>
                    <img src={post.author.image} alt="User" className="rounded-full md:w-14 md:h-14 w-10 h-10 " />
                  </Link>
                  <div className="flex flex-col ">
                    <div className="flex gap-2 items-center">
                      <Link href={session.user.id.toString() === post.authorId ? `/home/profile/${post.authorId}` : `/home/user/${post.authorId}`}>
                        <h3 className="text-lg text-main font-bold">{post.author.name}</h3>
                      </Link>
                      <span className="text-gray-400">{formatDateToIndonesian(post.createdAt)}</span>
                    </div>
                    <p className=" text-main text-lg">{post.title}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 text-gray-400">
                  <Link href={`/home/post/${post.id}`} className="flex gap-2 items-center">
                    <FaRegComments className="md:text-2xl text-lg" />
                    <span> Balas</span>
                  </Link>
                </div>
                <button className="text-gray-400 hover:text-main transition-colors mt-2" onClick={() => toggleComments(post.id)}>
                  {showComments[post.id] ? `Sembunyikan ${post.comments.length} Balasan` : `Tampilkan ${post.comments.length} Balasan`}
                </button>
                {showComments[post.id] && (
                  <div className="text-main">
                    <CommentsList postId={post.id} />
                  </div>
                )}
              </>
            );
          })}
      </>
    );
};

export default PostCard;
