import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import User from '@/components/shared-components/user/User';
import { getGame, getUser } from '@/lib/data';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import React from 'react';

export const metadata = {
  title: 'User',
  description: 'UWKS.MABAR User page',
};

type Props = {
  params: {
    id: string;
  };
};

const UserPage = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="text-red-500 text-2xl flex justify-center items-center">Unauthorized, Please Login!</div>; // Handle unauthorized state
  }

  const queryClient = new QueryClient();

  // Prefetch the user data
  await queryClient.prefetchQuery({
    queryKey: ['user', props.params.id],
    queryFn: () => getUser(props.params.id, session.backendTokens.accessToken),
  });
  await queryClient.prefetchQuery({
    queryKey: ['game', props.params.id],
    queryFn: () => getGame(props.params.id),
  });
  const dehydratedState = dehydrate(queryClient);

  const user = queryClient.getQueryData(['user', props.params.id]);
  const game = queryClient.getQueryData(['game', props.params.id]);
  return (
    <HydrationBoundary state={dehydratedState}>
      <User user={user} games={game} />
    </HydrationBoundary>
  );
};

export default UserPage;
