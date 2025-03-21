import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from './components/navbar';

type NavItemType = {
  name: string,
  link: string
};

const navItems: NavItemType[] = [
  { name: "Play", link: "/" },
  { name: "About", link: "/about-page" }
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Go (9x9) by Jason Katz",
  description: "Go (9x9) implemented by Jason Katz",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <NavBar items={navItems} /> */}
        {children}
      </body>
    </html>
  );
}
