'use client';
import React from 'react';
import Layout from './components/layout';
import Board from './components/board';
import { useEffect, useState } from 'react';

export default function Home() {
  interface MoveData {
    row: number;
    col: number;
    player_turn: number
  }

  interface BoardState {
    move: MoveData,
    board: number[][];
    turns: number[][];
    blackPrisoners: number;
    whitePrisoners: number;
    ko_x: number;
    ko_y: number;
    ko_player_restriction: number;
    last_black_move: String;
    last_white_move: String;
    this_turn: number;
  }

  let this_turn = 1;
  const [board, setBoard] = useState<number[][]>([]);

  const Payload = async () => {
    const handleMove = async (params: BoardState) => {
      const { move, board, blackPrisoners, whitePrisoners, ko_x, ko_y, ko_player_restriction } = params;
      try {
        const response = await fetch("http://localhost:8080/api/board/move", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params)
        });

        if (response.ok) {
          const responseJson = await response.json();
          setBoard(responseJson.board);
        } else {
          throw response.statusText;
        }
      } catch (error) {
        console.error("Failed to send payload to Java backend: ", error);
      };

    };

    const move: MoveData = {
      row: 5,
      col: 6,
      player_turn: -1,
    }

    let board = []
    for (let i = 0; i < 9; i++) {
      let row = [];
      for (let j = 0; j < 9; j++) {
        row.push(0);
      }
      board.push(row);
    }
    let turns = [...board]; // shallow copy of board since everything will be 0 to start

    const state: BoardState = {
      move: move,
      board: board,
      turns: turns,
      blackPrisoners: 1,
      whitePrisoners: 2,
      ko_x: 3,
      ko_y: 4,
      ko_player_restriction: 1,
      last_black_move: "",
      last_white_move: "",
      this_turn: this_turn
    }

    await handleMove(state);
  };
  // Payload();
  console.log("FINISHED");

  const boardClick = (x: number, y: number) => {
    console.log("Clicked: (" + x + "," + y + ")");
  };

  return (
    <Layout>
      {/* <Board>{board}</Board> */}
      <Board board={board} clickCallback={boardClick}></Board>
    </Layout>
  );
}