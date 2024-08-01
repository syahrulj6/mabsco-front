import Activites from '@/components/shared-components/activites/Activities';
import { getActivitiesByUserId } from '@/lib/data';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type Props = {
  params: {
    id: string;
  };
};

const UserActivites = async (props: Props) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['activities', props.params.id],
    queryFn: () => getActivitiesByUserId(props.params.id),
  });
  const dehydratedState = dehydrate(queryClient);

  const activities = queryClient.getQueryData(['activities', props.params.id]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Activites activities={activities} />
    </HydrationBoundary>
  );
};

export default UserActivites;
