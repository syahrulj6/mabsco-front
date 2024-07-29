// import Loading from '@/components/shared-components/Loading';
import PostCard from '@/components/shared-components/post/PostCard';

export const metadata = {
  title: 'Home',
  description: 'UWKS.MABAR Home page',
};

const HomePage = async () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 md:mt-32 mt-20">
      <div className="md:col-span-3 space-y-4 md:pl-72">
        <PostCard />
      </div>
    </div>
  );
};

export default HomePage;
