import React from 'react';
import Link from 'next/link';
import Layout from './components/layout';

export default function Home() {
  return (
    <Layout>
      <h1>Site under construction.</h1>
      <h2> Navigate to old-page
        <Link href='/posts'> here</Link>
      </h2>
    </Layout>

  );
}