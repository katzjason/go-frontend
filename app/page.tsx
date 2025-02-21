import React from 'react';
import Link from 'next/link';
import Layout from './components/layout';
import NavBar from './components/navbar';

type NavItemType = {
  name: string,
  link: string
};

const navItems: NavItemType[] = [
  { name: "Play", link: "/play-page" },
  { name: "About", link: "/about-page" }
];


export default function Home() {
  return (
    <Layout>
      <NavBar items={navItems} />
      <h1>Site under construction.</h1>
      <h2> Navigate to old-page
        <Link href='/posts'> here</Link>
      </h2>
    </Layout>

  );
}