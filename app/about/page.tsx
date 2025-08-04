'use client';
import React from 'react';
import Layout from '../components/layout';


export default function About() {
  return (
    <Layout>
      <div className="overflow-y-auto h-screen w-full [webkitOverflowScrolling:touch]">
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