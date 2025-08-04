'use client';
import React from 'react';
import Layout from '../components/layout';


export default function About() {
  return (
    <Layout>
      <div className="w-full h-full">
        <iframe
          src="/alpha-go-mini-readme.pdf"
          className="w-full h-full"
          title="alpha-go-mini-readme"
        />
      </div>
    </Layout>
  );
}