import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Post from '@/components/shared-components/post/CreatePost';
import { getServerSession } from 'next-auth';
import { CgDanger } from 'react-icons/cg';

export const metadata = {
  title: 'Create Post',
  description: 'UWKS.MABAR Create Post page',
};

const CreatePostPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-center w-80 md:w-2/4 mx-auto min-h-screen flex-col gap-3">
      <h1 className="text-main text-3xl font-bold">Buat Obrolan</h1>
      <Post session={session} />
      <div className="flex gap-2 text-red-500 items-center">
        <CgDanger className="text-3xl" /> <p>Dilarang membuat obrolan mengandung rasis dan sara. Jika terdapati maka akan di ban</p>
      </div>
    </div>
  );
};

export default CreatePostPage;
