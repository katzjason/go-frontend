import React, { ReactNode } from 'react';
import NavItem from './navitem';

type NavItemType = {
  name: string,
  link: string
};

type NavBarProps = {
  items: NavItemType[];
};

export default function NavBar({ items }: NavBarProps) {
  return (
    <div>
      {items.map(({ name, link }) => (
        <NavItem name={name} link={link}></NavItem>
      ))};
    </div>
  );
}