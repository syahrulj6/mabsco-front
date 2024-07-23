export type Post = {
  id: string;
  createdAt: Date;
  updateAt: Date;
  title: string;
  author: User;
  authorId: string;
  comments: Array<Comments>;
  likes: Array<Likes>;
};

enum GameTitle {
  VALORANT,
  MOBILE_LEGENDS,
}

export type Game = {
  id: string;
  username: string;
  gameTitle: GameTitle;
  gameId: string;
  user: User;
  userId: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  bio: string;
  onboarded: boolean;
  posts: Array<Post>;
  profile: Profile;
  game: Array<Game>;
  comments: Array<Comment>;
  likes: Array<Likes>;
};

export type Comments = {
  id: string;
  content: string;
  createdAt: Date;
  post: Array<Post>;
  postId: string;
  author: Array<User>;
  authorId: string;
};

export type Likes = {
  id: string;
  createdAt: Date;
  post: Array<Post>;
  postId: string;
  user: Array<User>;
  userId: string;
};
// types.ts
export interface CustomToken {
  user: {
    id: number;
    email: string;
    name: string;
    onboarded: boolean;
  };
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}
