import { useState } from 'react';
import Link from 'next/link';
import ToggleTheme from '@/app/components/toggleTheme';
import { Menu } from "lucide-react";

type NavItemType = {
  name: string,
  link: string
};

type NavBarProps = {
  items: NavItemType[];
};


export default function NavBar({ items }: NavBarProps) {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-[100%] px-4 py-2 flex items-center justify-between">
      <ul className="hidden md:flex gap-6 text-[rgb(var(--text))] text-xl">
        {items.map(({ name, link }) => (
          <li key={name}>
            <Link href={link}>{name}</Link>
          </li>
        ))}
      </ul>

      <Menu className="w-8 h-8 md:hidden cursor-pointer text-[rgb(var(--primary))]" onClick={() => setMenuOpen(!menuOpen)} />
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-[rgb(var(--primary))] flex flex-col gap-4 p-4 md:hidden z-50">
          {items.map(({ name, link }) => (
            <Link key={name} href={link} className="text-lg text-[rgb(var(--text))]">
              {name}
            </Link>
          ))}
        </div>
      )}
      <ToggleTheme></ToggleTheme>
    </nav>
  );
}