import React, { ReactNode } from 'react';
import styles from './layout.module.css';
import NavBar from '@/app/components/navbar';


export default function Layout({ children }: { children: ReactNode }) {
  const navItems = [{ "name": "Play", "link": "/" },
  { "name": "Rules", "link": "/rules" },
  { "name": "About", "link": "/about" }]

  return (
    <div className="flex flex-col items-center">
      <NavBar items={navItems}></NavBar>
      <div className="flex flex-col h-screen w-[100%] xl:w-[80%]">{children}</div>
    </div>

  );
}