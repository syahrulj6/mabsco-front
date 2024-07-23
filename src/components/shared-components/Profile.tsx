'use client';

import { Game } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

const Profile = ({ user, session, games }: any) => {
  return (
    <>
      <div className="flex w-full min-h-screen flex-col px-12 mt-32 md:px-60 md:mt-36">
        <div className="flex gap-4 items-center">
          <div className="relative h-16 w-16 md:h-24 md:w-24 -z-10">
            <Image src={user.image} fill alt="logo" className="rounded-full" />
          </div>
          <div className="flex flex-col md:gap-3">
            <h2 className="text-main font-bold text-lg md:text-2xl">{user.name}</h2>
            <p className="text-second text-sm md:text-base">{user.bio}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-6 md:mt-10">
          <h2 className=" text-lg md:text-2xl font-bold text-main ">Bermain game</h2>
          <div className="flex gap-2 items-center">
            {games &&
              games.map((game: any) => (
                <>
                  {game.gameTitle === 'VALORANT' && (
                    <div className="relative h-12 w-12 md:h-16 md:w-16 -z-10">
                      <Image src="/images/valorant-logo.png" fill alt="logo" className="rounded-full" />
                    </div>
                  )}
                  {game.gameTitle === 'MOBILE_LEGENDS' && (
                    <div className="relative h-12 w-12 md:h-16 md:w-16 -z-10">
                      <Image src="/images/ml-logo.png" fill alt="logo" className="rounded-full" />
                    </div>
                  )}
                  <div className="flex flex-col md:gap-2">
                    <p className="md:text-lg text-main font-bold">{game.username}</p>
                    <p className=" text-second text-sm md:text-base">#{game.gameId}</p>
                  </div>
                </>
              ))}
          </div>
        </div>
        <Link href={`/home/user/${session?.user.id}/edit`} className="bg-main h-6 text-sm md:text-base md:h-8 mt-4 md:mt-7 w-full flex justify-center items-center rounded-md md:rounded-lg">
          Edit profil
        </Link>
        {/* <div className="flex flex-col ">{userPosts()}</div> */}
      </div>
    </>
  );
};

export default Profile;
