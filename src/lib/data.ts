import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { Backend_URL } from './Constant';
import { Post } from './types';

const instance = axios.create({
  baseURL: Backend_URL,
});

// USER
export async function getAllUsers() {
  const res = await instance.get('users');
  return res.data;
}

export async function getUser(id: string | undefined, accessToken: string | undefined) {
  const res = await instance.get(`users/${id}`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
}

export const fetchUsersByName = async (name: string) => {
  const { data } = await instance.get(`/users/search?name=${name}`);
  return data;
};

export const patchUser = async (userId: string, data: { name?: string; bio?: string }) => {
  try {
    const response = await instance.patch(`users/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};

// POST
export async function getAllPost() {
  const res = await instance.get('posts');
  const posts = res.data;

  // Assuming each post has a 'createdAt' field which is a date string
  const sortedPosts = posts.sort((a: any, b: any) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return sortedPosts;
}

export async function getAllPostByAuthorId(authorId: string) {
  const res = await instance.get(`posts/author/${authorId}`);
  return res.data;
}

export async function getPost(id: string) {
  const res = await instance.get(`posts/${id}`);
  return res.data;
}

export async function createPost(authorId: string, title: string) {
  const res = await instance.post('posts', {
    title,
    authorId,
  });

  console.log(res);
  return res.data;
}

export async function deletePost(postId: String) {
  try {
    const response = await instance.delete(`posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
}

// GAME
export async function getGame(userId: string) {
  const res = await instance.get(`game/${userId}`);
  return res.data;
}

// COMMENTS
export async function getCommentsByPostId(postId: string) {
  const res = await instance.get(`posts/${postId}/comments`);

  return res.data;
}
