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
  image: string;
  onboarded: boolean;
  posts: Array<Post>;
  profile: Profile;
  game: Array<Game>;
  comments: Array<Comment>;
  likes: Array<Likes>;
};

export interface Post {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  comments: Comment[];
  likes: Like[];
  likesCount: number;
  likedByCurrentUser: boolean;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  postId: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  authorId: string;
}

export interface Activities {
  id: string;
  message: string;
  createdAt: Date;
  postId: string;
  userId: string;
  post: Post;
}

export interface Like {
  id: string;
  createdAt: string;
  postId: string;
  userId: string;
}
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
