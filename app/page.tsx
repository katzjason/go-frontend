'use client';
import React from 'react';
import Layout from './components/layout';
import Board from './components/board';
import { useEffect, useState } from 'react';


interface MoveData {
  row: number;
  col: number;
  player_turn: number
};

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
};

const initialBoardState: BoardState = {
  move: { row: 0, col: 0, player_turn: 1 },
  board: Array(9).fill(Array(9).fill(0)),
  turns: Array(9).fill(Array(9).fill(0)),
  blackPrisoners: 0,
  whitePrisoners: 0,
  ko_x: -1,
  ko_y: -1,
  ko_player_restriction: 0,
  last_black_move: "",
  last_white_move: "",
  this_turn: 0,
};


export default function Home() {
  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);
  const sendRequest = async (state: BoardState) => {
    try {

      const response = await fetch("http://localhost:8080/api/board/move", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      });
      if (!response.ok) throw new Error(response.statusText);
      const responseJson = await response.json();

      setBoardState((prevBoardState) => {
        return {
          ...prevBoardState,
          board: responseJson.board,
          move: { row: 0, col: 0, player_turn: responseJson.move_player },
          turns: Array(9).fill(Array(9).fill(0)),
          blackPrisoners: 0,
          whitePrisoners: 0,
          ko_x: -1,
          ko_y: -1,
          ko_player_restriction: 0,
          last_black_move: "",
          last_white_move: "",
          this_turn: prevBoardState.this_turn + 1,
          move_added: responseJson.added,
        }
      });

    } catch (error) {
      console.error("Failed to send payload to backend: ", error);
    };
  }

  const boardClick = ((x: number, y: number) => {
    setBoardState((prevBoardState) => {
      const new_boardState: BoardState = {
        ...prevBoardState,
        move: { row: y, col: x, player_turn: prevBoardState.move.player_turn },
      }
      sendRequest(new_boardState);
      return new_boardState;
    });
  });

  return (
    < Layout >
      <Board board={boardState.board} clickCallback={boardClick}></Board>
    </Layout >
  );

}
