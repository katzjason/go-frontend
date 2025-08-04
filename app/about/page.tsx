'use client';
import React from 'react';
import Layout from '../components/layout';


export default function About() {
  return (
    <Layout>
      <div className="flex md:hidden flex-col items-center justify-center h-screen text-center p-4">
        <p className="text-[rgb(var(--text))] text-xl">Alpha Go Mini README</p>
        <a
          href="/alpha-go-mini-readme.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[rgb(var(--secondary))] text-white px-4 py-4 mt-4 rounded shadow"
        >Open PDF</a>
      </div>
      <div className="hidden md:block overflow-y-auto h-screen w-full [webkitOverflowScrolling:touch]">
        <iframe
          src="/alpha-go-mini-readme.pdf"
          className="w-full min-h-[100vh] border-none"
          style={{ display: 'block' }}
          title="alpha-go-mini-readme"
        />
      </div>
    </Layout>
  );
}