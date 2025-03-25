'use client';
import React from 'react';
import Layout from './components/layout';
import Board from './components/board';
import ToggleSetting from './components/toggleSetting';
import StartButton from './components/startButton';
import { useEffect, useState } from 'react';
import ScoreDashBoard from './components/scoreDashboard';


interface MoveData {
  row: number;
  col: number;
  passed: number;
  player_turn: number
};

interface BoardState {
  move: MoveData,
  board: number[][];
  turns: number[][];
  blacksPrisoners: number;
  whitesPrisoners: number;
  ko_x: number;
  ko_y: number;
  ko_player_restriction: number;
  last_black_move: String;
  last_white_move: String;
  this_turn: number;
  game_over: boolean;
  blacks_score: number;
  whites_score: number;
  area_scoring: boolean;
};


const initialBoardState: BoardState = {
  move: { row: 0, col: 0, passed: 0, player_turn: 1 },
  board: Array(9).fill(Array(9).fill(0)),
  turns: Array(9).fill(Array(9).fill(0)),
  blacksPrisoners: 0,
  whitesPrisoners: 0,
  ko_x: 10,
  ko_y: 10,
  ko_player_restriction: 0,
  last_black_move: "",
  last_white_move: "",
  this_turn: 1,
  game_over: false,
  blacks_score: 0,
  whites_score: 0,
  area_scoring: false,
};


export default function Home() {
  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);
  const [liveGame, setLiveGame] = useState(false);
  const [oneVone, setOneVOne] = useState(true);
  const [areaScoring, setAreaScoring] = useState(true);

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
        let new_last_black_move = prevBoardState.last_black_move;
        let new_last_white_move = prevBoardState.last_white_move;
        let new_game_over = responseJson.game_over == true ? true : prevBoardState.game_over;
        if (prevBoardState.move.player_turn != responseJson.move_player) {
          if (prevBoardState.move.player_turn == 1) {
            if (prevBoardState.move.passed == 1) {
              new_last_black_move = "pass";
            } else {
              new_last_black_move = `${prevBoardState.move.col},${prevBoardState.move.row}`;
            }
          } else {
            if (prevBoardState.move.passed == 1) {
              new_last_white_move = "pass";
            } else {
              new_last_white_move = `${prevBoardState.move.col},${prevBoardState.move.row}`;
            }

          }
        };
        return {
          ...prevBoardState,
          board: responseJson.board,
          move: { row: prevBoardState.move.row, col: prevBoardState.move.col, passed: prevBoardState.move.passed, player_turn: responseJson.move_player },
          turns: responseJson.turns,
          blacksPrisoners: responseJson.blacks_prisoners,
          whitesPrisoners: responseJson.whites_prisoners,
          ko_x: responseJson.ko.first,
          ko_y: responseJson.ko.second,
          ko_player_restriction: responseJson.ko_player_restriction,
          last_black_move: new_last_black_move,
          last_white_move: new_last_white_move,
          this_turn: responseJson.this_turn,
          game_over: new_game_over,
          blacks_score: responseJson.blacks_score,
          whites_score: responseJson.whites_score,
          area_scoring: areaScoring,
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
        move: { row: y, col: x, passed: 0, player_turn: prevBoardState.move.player_turn },
      }
      if (!prevBoardState.game_over) {
        sendRequest(new_boardState);
      }
      return new_boardState;
    });
  });

  const startGame = (() => {
    if (!liveGame) {
      setLiveGame(true);
    }
  });

  const toggleOneVOne = (() => {
    if (!liveGame) {
      setOneVOne(!oneVone);
    }

  })

  const toggleAreaScoring = (() => {
    if (!liveGame) {
      setAreaScoring(!areaScoring);
    }
  })


  const passTurn = (() => {
    setBoardState((prevBoardState) => {
      const new_boardState: BoardState = {
        ...prevBoardState,
        move: { row: prevBoardState.move.row, col: prevBoardState.move.col, passed: 1, player_turn: prevBoardState.move.player_turn },
      }
      if (!prevBoardState.game_over) {
        sendRequest(new_boardState);
      }
      return new_boardState;
    });
  });

  return (
    < Layout >
      <ToggleSetting instruction="Select Game Mode:" option1={"1v1"} option2={"vs AI"} writeable={!liveGame} clickCallback={toggleOneVOne} disabled={liveGame}></ToggleSetting>
      <ToggleSetting instruction="Select Scoring Method:" option1={"Area"} option2={"Territory"} writeable={!liveGame} clickCallback={toggleAreaScoring} disabled={liveGame}></ToggleSetting>
      <StartButton clickCallback={startGame} writeable={!liveGame}></StartButton>
      <ScoreDashBoard blackScore={boardState.game_over ? boardState.blacks_score : boardState.blacksPrisoners} whiteScore={boardState.game_over ? boardState.whites_score : boardState.whitesPrisoners} gameOver={boardState.game_over}></ScoreDashBoard>
      <Board board={boardState.board} clickCallback={boardClick} handlePass={passTurn} enabled={liveGame} blacksTurn={boardState.move.player_turn == 1 ? true : false}></Board>
    </Layout >
  );
}
