import { ReactNode, useState } from 'react';
import styles from './scoreDashboard.module.css';

interface params {
  blackScore: number,
  whiteScore: number,
  gameOver: boolean,
}



export default function ScoreDashBoard({ blackScore, whiteScore, gameOver }: params) {


  return (
    <div className={styles.container}>
      <rect
        className={`${gameOver && blackScore > whiteScore ? styles.blackWinnerScore :
          (gameOver && blackScore < whiteScore ? styles.loserScore : null)} ${styles.blackScore}`}>{blackScore}</rect>
      <rect className={`${gameOver && whiteScore > blackScore ? styles.whiteWinnerScore :
        (gameOver && whiteScore < blackScore ? styles.loserScore : null)} ${styles.whiteScore}`}>{whiteScore}</rect>
    </div>

  );
}