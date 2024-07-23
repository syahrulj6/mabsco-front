// import Loading from '@/components/shared-components/Loading';
import PostCard from '@/components/shared-components/PostCard';

const HomePage = async () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 md:mt-32">
      <div className="md:col-span-3 space-y-4 md:pl-72">
        <PostCard />
      </div>

      {/* Sidebar */}
      <div className="md:col-span-1 flex flex-col items-center space-y-4">
        <div className="p-4 rounded-lg w-full text-main">
          <h2 className="text-xl mb-4 font-bold">Gabung Komunitas</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>TIF Valo</span>
              <button className="bg-main hover:bg-white/80 text-black transition-colors duration-200 px-2 py-1 rounded">Join</button>
            </div>
            <div className="flex items-center justify-between">
              <span>FEB Valo</span>
              <button className="bg-main hover:bg-white/80 text-black transition-colors duration-200 px-2 py-1 rounded">Join</button>
            </div>
            <div className="flex items-center justify-between">
              <span>Pubgm fh</span>
              <button className="bg-main hover:bg-white/80 text-black transition-colors duration-200 px-2 py-1 rounded">Join</button>
            </div>
            <div className="flex items-center justify-between">
              <span>ML TIF</span>
              <button className="bg-main hover:bg-white/80 text-black transition-colors duration-200 px-2 py-1 rounded">Join</button>
            </div>
            <div className="flex items-center justify-between">
              <span>Law FF</span>
              <button className="bg-main hover:bg-white/80 text-black transition-colors duration-200 px-2 py-1 rounded">Join</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
