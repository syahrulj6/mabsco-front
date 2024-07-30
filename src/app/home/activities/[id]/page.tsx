import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Activites from '@/components/shared-components/activites/Activities';
import { getActivitiesByUserId } from '@/lib/data';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

type Props = {
  params: {
    id: string;
  };
};

const UserActivites = async (props: Props) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="text-red-500 text-2xl flex justify-center items-center">Unauthorized, Please Login!</div>; // Handle unauthorized state
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['activities', props.params.id],
    queryFn: () => getActivitiesByUserId(props.params.id),
  });
  const dehydratedState = dehydrate(queryClient);

  const activities = queryClient.getQueryData(['activities', props.params.id]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Activites activities={activities} user={session.user} />
    </HydrationBoundary>
  );
};

export default UserActivites;
