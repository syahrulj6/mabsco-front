import { formatDateToIndonesian } from '@/lib/Constant';
import { Activities } from '@/lib/types';
import Link from 'next/link';

const Activites = ({ activities, user }: { activities: any; user: any }) => {
  return (
    <div className="flex w-full min-h-screen flex-col px-12 mt-32 md:px-60 md:mt-36">
      {activities.map((activity: Activities) => (
        <Link href={`/home/post/${activity.postId}`} className="bg-secondary rounded-md py-4 px-6 flex justify-between" key={activity.id}>
          <p className="text-main  ">{activity.message}</p>
          <p className="text-gray-400">{formatDateToIndonesian(activity.createdAt)}</p>
        </Link>
      ))}
    </div>
  );
};

export default Activites;
