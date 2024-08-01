import * as z from 'zod';

export const SignUpSchema = z.object({
  name: z.string().min(2, 'First name must be at least 2 characters').max(45, 'First name must be less than 45 characters').regex(new RegExp('^[a-zA-Z ]+$'), 'No special characters allowed!'), // Updated regex
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(50, 'Password must be less than 50 characters'),
});

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string({ required_error: 'Please enter your password' }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email!'),
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters!').max(52, 'Password must be less than 52 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password does not match!',
    path: ['confirmPassword'],
  });

export enum GAMES {
  VALORANT = 'VALORANT',
  MOBILE_LEGENDS = 'MOBILE_LEGENDS',
  FREE_FIRE = 'FREE_FIRE',
  PUBGM = 'PUBGM',
}

export const ProfileSchema = z.object({
  bio: z.string().max(55, 'Bio must be less than 55 characters!'),
  image: z.string(),
  onboarded: z.boolean(),
});

export const GameSchema = z.object({
  gameTitle: z.nativeEnum(GAMES),
  username: z.string().max(40, 'Username must be less than 50 characters!'),
  gameId: z.string().max(28, 'Game ID must be less than 28 characters!'),
  userId: z.string(),
});

export const PostSchema = z.object({
  title: z.string().max(300, 'Post must be less than 300 characters'),
  authorId: z.string(),
});

export const CommentSchema = z.object({
  content: z.string().max(100, 'Comment must be less than 100 characters!'),
  postId: z.string(),
  authorId: z.string(),
});

export const LikeSchema = z.object({
  postId: z.string(),
  userId: z.string(),
});
