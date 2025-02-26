
'use client';
import React from 'react';
import Link from 'next/link';
import Layout from './components/layout';
import Board from './components/board';


import { useEffect, useState } from 'react';

export default function Home() {

  const [board, setBoard] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/board")
      .then((response) => response.json())
      .then((data) => setBoard(data))
      .catch((error) => console.error("Error fetchiing board", error))
  }, []);



  return (
    <Layout>
      <Board></Board>
      <h1>Site under construction.</h1>
      <h2>{board}</h2>
    </Layout>
  );
}