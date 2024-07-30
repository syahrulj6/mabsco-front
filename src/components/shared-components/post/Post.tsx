import { formatDateToIndonesian } from '@/lib/Constant';
import Link from 'next/link';
import React from 'react';
import { CiShare2 } from 'react-icons/ci';
import { FaRegComments } from 'react-icons/fa6';
import { CommentsForm } from '@/components/shared-components/comment/commentsForm';
import CommentsList from '../comment/CommentList';

const Post = ({ post }: any) => {
  return (
    <div className="mb-10 flex flex-col min-h-screen md:mt-52 md:container">
      <div key={post.id} className="flex items-center space-x-4">
        <img src={post.author?.image} alt="User" className="rounded-full md:w-14 md:h-14 w-10 h-10" />
        <div className="flex gap-2 items-center">
          {post.author && <h3 className="text-lg text-main font-bold">{post.author.name}</h3>}
          <span className="text-gray-400">{formatDateToIndonesian(post.createdAt)}</span>
        </div>
      </div>
      <p className="mt-4 text-main text-lg">{post.title}</p>
      <div className="flex items-center justify-between mt-4 text-gray-400 mb-4">
        <Link href={`/home/post/${post.id}`} className="flex gap-2 items-center">
          <FaRegComments className="md:text-2xl text-lg" />
          <span>Balas</span>
        </Link>
        <button className="flex gap-2 items-center">
          <CiShare2 className="md:text-2xl text-lg" />
          <span>Share</span>
        </button>
      </div>
      <CommentsForm postId={post.id} />

      <div className="flex flex-col gap-2 mt-4 ">
        <p className="text-main text-lg md:text-xl">Comments</p>
        <CommentsList postId={post.id} />
      </div>
    </div>
  );
};

export default Post;
