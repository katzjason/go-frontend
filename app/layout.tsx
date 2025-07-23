import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import '@/styles/globals.css';
import { ThemeProvider } from '@/app/components/themeProvider';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Alpha Go Mini | Jason Katz",
  description: "Alpha Go Mini implemented by Jason Katz",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> */}
      <ThemeProvider>
        <body>{children}</body>
        {/* </body> */}
      </ThemeProvider>

    </html>
  );
}
