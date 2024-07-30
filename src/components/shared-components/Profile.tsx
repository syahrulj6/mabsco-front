'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import PostsByAuthor from './post/PostsByAuthor';
import { patchUser } from '@/lib/data'; // Import the patchUser function
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const Profile = ({ user, games }: any) => {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await patchUser(user.id, { name, bio });
      router.refresh();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'berhasil edit profile',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile');
    }
  };

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
                <div className="flex gap-2" key={game.id}>
                  {game.gameTitle === 'VALORANT' && (
                    <div className="relative h-12 w-12 md:h-16 md:w-16 -z-10">
                      <Image src="/images/valorant-logo.png" fill alt="logo" className="rounded-full" />
                    </div>
                  )}
                  {game.gameTitle === 'MOBILE_LEGENDS' && (
                    <div className="relative h-12 w-12 md:h-16 md:w-16 -z-10">
                      <Image src="/images/ml-logo.jpg" fill alt="logo" className="rounded-full object-contain" />
                    </div>
                  )}
                  <div className="flex flex-col md:gap-2">
                    <p className="md:text-lg text-main font-bold">{game.username}</p>
                    <p className=" text-second text-sm md:text-base">#{game.gameId}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="mt-4" />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-main">
                    Name
                  </Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right text-main">
                    Bio
                  </Label>
                  <Input id="bio" value={bio} onChange={(e) => setBio(e.target.value)} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="text-black bg-main hover:bg-white/80">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <PostsByAuthor authorId={user.id} />
      </div>
    </>
  );
};

export default Profile;
