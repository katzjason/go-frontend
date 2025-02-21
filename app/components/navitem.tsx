import React, { ReactNode } from 'react';
import Link from 'next/link';


const NavItem = ({ name, link }: { name: string; link: string }) => {
  return (
    <Link href={link}>{name}</Link>
  );
};

export default NavItem;
