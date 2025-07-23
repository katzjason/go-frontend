'use client';
import React from 'react';
import Layout from './components/layout';
import Board from './components/board';
import ToggleSetting from './components/toggleSetting';
import StartButton from './components/startButton';
import { useState } from 'react';
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
  last_black_move: string;
  last_white_move: string;
  this_turn: number;
  game_over: boolean;
  blacks_score: number;
  whites_score: number;
  area_scoring: boolean;
  oneVone: boolean;
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
  oneVone: true,
};


export default function Home() {
  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);
  const [liveGame, setLiveGame] = useState(false);
  const [oneVone, setOneVOne] = useState(true);
  const [areaScoring, setAreaScoring] = useState(true);
  // const [tempDisableBoard, setTempDisableBoard] = useState(false);

  const sendRequest = async (state: BoardState): Promise<BoardState> => {
    try {
      // const response = await fetch("http://localhost:8080/api/board/move", {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/board/move`, {
        //const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
        //const response = await fetch(backendUrl + "/api/board/move", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      });
      if (!response.ok) throw new Error(response.statusText);
      const responseJson = await response.json();


      // setBoardState((prevBoardState) => {
      let new_last_black_move = state.last_black_move;
      let new_last_white_move = state.last_white_move;
      const new_game_over = responseJson.game_over == true ? true : state.game_over;
      if (state.move.player_turn != responseJson.move_player) {
        if (state.move.player_turn == 1) {
          if (state.move.passed == 1) {
            new_last_black_move = "pass";
          } else {
            new_last_black_move = `${state.move.col}, ${state.move.row}`;
          }
        } else {
          if (state.move.passed == 1) {
            new_last_white_move = "pass";
          } else {
            new_last_white_move = `${state.move.col},${state.move.row} `;
          }

        }
      };

      const updatedState: BoardState = {
        // return {
        ...state,
        board: responseJson.board,
        move: { row: state.move.row, col: state.move.col, passed: state.move.passed, player_turn: responseJson.move_player },
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
        oneVone: oneVone,
      }
      // });
      return updatedState;
    } catch (error) {
      console.error("Failed to send payload to backend: ", error);
      throw error;
    };
  }

  const sendAIRequest = async (state: BoardState, callback: (newBoardState: BoardState) => void) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/board/ai_move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      });
      if (!response.ok) throw new Error(response.statusText);
      const responseJson = await response.json();

      let new_last_black_move = state.last_black_move;
      let new_last_white_move = state.last_white_move;
      const new_game_over = responseJson.game_over === true ? true : state.game_over;

      if (state.move.player_turn !== responseJson.move_player) {
        if (state.move.player_turn === 1) {
          new_last_black_move = state.move.passed === 1
            ? 'pass'
            : `${state.move.col}, ${state.move.row}`;
        } else {
          new_last_white_move = state.move.passed === 1
            ? 'pass'
            : `${state.move.col}, ${state.move.row}`;
        }
      }

      // return {
      const newBoardState: BoardState = {
        ...state,
        board: responseJson.board,
        move: {
          row: state.move.row,
          col: state.move.col,
          passed: state.move.passed,
          player_turn: responseJson.move_player,
        },
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
        oneVone: oneVone,
      };
      callback(newBoardState);

    } catch (error) {
      console.error("Failed to send payload to algo api: ", error);
    }
  }

  const boardClick = (x: number, y: number) => {
    setBoardState((prevBoardState) => {
      const userMoveState: BoardState = {
        ...prevBoardState,
        move: { row: y, col: x, passed: 0, player_turn: prevBoardState.move.player_turn },
        oneVone: oneVone,
      };

      if (!userMoveState.game_over) {
        sendRequest(userMoveState)
          .then((updatedUserMoveState) => {
            if (!oneVone) {
              sendAIRequest(updatedUserMoveState, (ai_boardState) => {
                setBoardState(ai_boardState);
              });
            } else {
              setBoardState(updatedUserMoveState);
            }
          });
      }
      return userMoveState;
    });
  };


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
        oneVone: oneVone,
      }
      if (!prevBoardState.game_over) {
        sendRequest(new_boardState).then((updatedUserMoveState) => {
          if (!oneVone) {
            sendAIRequest(updatedUserMoveState, (ai_boardState) => {
              setBoardState(ai_boardState);
            });
          } else {
            setBoardState(updatedUserMoveState);
          }
        });
      }
      return new_boardState;
    });
  });

  return (
    < Layout >
      <div className="flex flex-col xl:flex-row h-[100%] items-center xl:items-start xl:justify-center xl:pt-10">
        <div className="flex flex-col p-4 xl:p-7 h-2/5 max-h-80 xl:h-screen w-full xl:w-1/3 items-center">
          <ToggleSetting option1={"1v1"} option2={"vs AI"} writeable={!liveGame} clickCallback={toggleOneVOne} disabled={liveGame}></ToggleSetting>
          <ToggleSetting option1={"Area"} option2={"Territory"} writeable={!liveGame} clickCallback={toggleAreaScoring} disabled={liveGame}></ToggleSetting>
          <StartButton clickCallback={startGame} writeable={!liveGame}></StartButton>
          <ScoreDashBoard blackScore={boardState.game_over ? boardState.blacks_score : boardState.blacksPrisoners} whiteScore={boardState.game_over ? boardState.whites_score : boardState.whitesPrisoners} gameOver={boardState.game_over}></ScoreDashBoard>
        </div>
        <div className="flex flex-col aspect-[1/1] w-full max-w-[700px]">
          <Board board={boardState.board} clickCallback={boardClick} handlePass={passTurn} enabled={liveGame} blacksTurn={boardState.move.player_turn == 1 ? true : false} tempDisabled={false}></Board>
        </div>
      </div>
    </Layout >
  );
}
// h-1/2 xl:h-full max-h-screen xl:w-auto xl:max-w-[75%] aspect-[1/1] mx-auto
