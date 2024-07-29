'use client';

import React, { useState, useEffect } from 'react';
import { getAllUsers } from '@/lib/data';
import { User } from '@/lib/types';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const UserSearch: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
        setFilteredUsers(allUsers);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredUsers(users);
    } else {
      const lowercasedSearch = search.toLowerCase();
      const filtered = users.filter((user) => user.name.toLowerCase().includes(lowercasedSearch));
      setFilteredUsers(filtered);
    }
  }, [search, users]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="px-8 md:container mt-32 md:mt-44 text-main">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for users" />
      </form>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <div className="flex flex-col gap-4 mt-3 md:mt-4">
        {filteredUsers.length > 0
          ? filteredUsers.map((user) => (
              <div key={user.id} className="flex gap-2 items-center ">
                <Link className="font-bold text-base md:text-lg " href={`/home/user/${user.id}`}>
                  <img src={user.image} className="w-10 h-10 md:w-14 md:h-14 rounded-full" />
                </Link>
                <div className="flex flex-col ">
                  <Link className="font-bold text-base md:text-lg " href={`/home/user/${user.id}`}>
                    {user.name}
                  </Link>
                  <p className="text-gray-400">{user.bio}</p>
                </div>
                {/* Add more user details as needed */}
              </div>
            ))
          : !isLoading && <div>No users found</div>}
      </div>
    </div>
  );
};

export default UserSearch;
