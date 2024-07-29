import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Post from '@/components/shared-components/post/Post';
import { getPost } from '@/lib/data';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Post',
  description: 'UWKS.MABAR Post page',
};

type Props = {
  params: {
    id: string;
  };
};

const SinglePostPage = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="text-red-500 text-2xl flex justify-center items-center">Unauthorized, Please Login!</div>;
  }

  const queryClient = new QueryClient();

  // Prefetch the post data
  await queryClient.prefetchQuery({
    queryKey: ['post', props.params.id],
    queryFn: () => getPost(props.params.id),
  });

  const dehydratedState = dehydrate(queryClient);
  const post = queryClient.getQueryData(['post', props.params.id]);

  if (!post) {
    return <div className="text-red-500 text-2xl flex justify-center items-center">Post not found</div>;
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <Post post={post} currentUser={session.user} />
    </HydrationBoundary>
  );
};

export default SinglePostPage;
