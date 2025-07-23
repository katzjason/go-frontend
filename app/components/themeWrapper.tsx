'use client' // good practice to include when dealing with react hooks or event handlers
import { useEffect } from 'react';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const defaultTheme = localStorage.getItem('theme');
    const prefersDark = defaultTheme === 'dark' || (!defaultTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', prefersDark);
  });

  return <>{children}</>

}