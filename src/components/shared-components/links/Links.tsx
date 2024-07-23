'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavLinks = ({ item }: any) => {
  const pathName = usePathname();

  return (
    <Link href={`/home/${item.category}`} className={` hover:text-main ${pathName === item.path && 'text-main/80'}`}>
      {item.category}
    </Link>
  );
};

export default NavLinks;
