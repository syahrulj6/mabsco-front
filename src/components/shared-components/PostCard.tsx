'use client';

import { getAllPost } from '@/lib/data';
import { Post } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingAnimation from './LoadingAnimation';
import { formatDateToIndonesian } from '@/lib/Constant';
import { FaRegComments } from 'react-icons/fa6';
import { CiShare2 } from 'react-icons/ci';
import { GoHeart } from 'react-icons/go';

const PostCard = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPost,
  });

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return <div>Error loading posts.</div>;
  }

  console.log(posts);

  return (
    <>
      {posts &&
        posts.map((post: Post) => (
          <div className="mb-10">
            <div key={post.id} className="flex items-center space-x-4 ">
              <img src="https://via.placeholder.com/40" alt="User" className="rounded-full" />
              <div className="flex gap-2 items-center">
                <h3 className="text-lg text-main font-bold">{post.author.name}</h3>
                <span className="text-gray-400">{formatDateToIndonesian(post.createdAt)}</span>
              </div>
            </div>
            <p className="mt-4 text-main text-lg">{post.title}</p>
            <div className="flex items-center justify-between mt-4 text-gray-400">
              <div className="flex gap-2 items-center">
                <GoHeart className="md:text-2xl text-lg" />
                <span className="md:text-base text-sm">12 Suka</span>
              </div>
              <button className="flex gap-2 items-center">
                <FaRegComments className="md:text-2xl text-lg" />
                <span>2 Balasan</span>
              </button>
              <button className="flex gap-2 items-center">
                <CiShare2 className="md:text-2xl text-lg" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default PostCard;
