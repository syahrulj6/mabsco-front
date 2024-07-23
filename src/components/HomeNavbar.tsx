'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GoPerson, GoHome, GoHeart, GoPencil, GoSearch } from 'react-icons/go';

const HomeNavbar = () => {
  const { data: session } = useSession();

  if (session && session.user)
    return (
      <div className="flex flex-col min-h-screen justify-between">
        <div className="flex w-full justify-end px-8 md:justify-around  items-center gap-3 py-4 fixed z-10">
          <Link href={'/home'} className=" hidden md:block md:relative  h-16 w-16  md:h-[60px] md:w-[60px]  ">
            <Image src="/images/logo.png" fill alt="logo" />
          </Link>
          <div className="hidden md:flex gap-14">
            <Link href={'/home'} className="text-white/50 hover:text-white transition-colors text-4xl">
              <GoHome />
            </Link>
            <Link href={'/home/search'} className="text-white/50 hover:text-white transition-colors text-4xl">
              <GoSearch />
            </Link>
            <Link href={'/home/post'} className="text-white/50 hover:text-white transition-colors text-4xl">
              <GoPencil />
            </Link>
            <Link href={'/home/activities'} className="text-white/50 hover:text-white transition-colors text-4xl">
              <GoHeart />
            </Link>
            <Link href={`/home/user/${session.user.id}`} className="text-white/50 hover:text-white transition-colors text-4xl">
              <GoPerson />
            </Link>
          </div>
          <div className="flex">
            <Link href={'/api/auth/signout'} className=" md:text-base text-sm text-white px-3 rounded-full py-2 bg-red-500 hover:bg-red-700 transition-colors duration-200">
              Sign Out
            </Link>
          </div>
        </div>
        <footer className="py-4 md:hidden w-full mt-auto ml-7">
          <div className="flex  gap-10 ">
            <Link href={'/home'} className="text-white/50 hover:text-white transition-colors text-4xl">
              <GoHome />
            </Link>
            <Link href={'/home/search'} className="text-white/50 hover:text-white transition-colors text-4xl">
              <GoSearch />
            </Link>
            <Link href={'/home/post'} className="text-white/50 hover:text-white transition-colors text-4xl">
              <GoPencil />
            </Link>
            <Link href={'/home/activities'} className="text-white/50 hover:text-white transition-colors text-4xl">
              <GoHeart />
            </Link>
            <Link href={`/home/user/${session.user.id}`} className="text-white/50 hover:text-white transition-colors text-4xl">
              <GoPerson />
            </Link>
          </div>
        </footer>
      </div>
    );
};

export default HomeNavbar;
