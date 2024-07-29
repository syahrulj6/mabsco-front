import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserSearch from '@/components/shared-components/search/userSearch';
import { getAllUsers } from '@/lib/data';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Search',
  description: 'UWKS.MABAR Search page',
};

const SearchPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="text-red-500 text-2xl flex justify-center items-center">Unauthorized, Please Login!</div>;
  }

  const queryClient = new QueryClient();

  // Prefetch the post data
  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
  });

  const dehydratedState = dehydrate(queryClient);
  const post = queryClient.getQueryData(['users']);

  if (!post) {
    return <div className="text-red-500 text-2xl flex justify-center items-center">Post not found</div>;
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <UserSearch />
    </HydrationBoundary>
  );
};

export default SearchPage;
