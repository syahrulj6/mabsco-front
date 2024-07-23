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

export async function getGame(userId: string) {
  const res = await instance.get(`game/${userId}`);
  return res.data;
}
