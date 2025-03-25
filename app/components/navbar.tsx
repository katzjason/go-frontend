import React from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';

type NavItemType = {
  name: string,
  link: string
};

type NavBarProps = {
  items: NavItemType[];
};


export default function NavBar({ items }: NavBarProps) {
  return (
    <ul className={styles.container}>
      {items.map(({ name, link }) => (
        <li className={styles.navItem} key={name}>
          <Link href={link}>{name}</Link>
        </li>
      ))
      }
    </ul >
  );
}