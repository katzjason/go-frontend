import React, { ReactNode, useState } from 'react';
import styles from './startButton.module.css';

interface props {
  clickCallback: () => void;
  writeable: boolean;
}

export default function StartButton({ clickCallback, writeable }: props) {
  return (
    <div className={styles.container}>

      <rect className={`${writeable ? styles.writeable : styles.unwriteable} ${styles.button}`} onClick={clickCallback}>Start</rect>
    </div>
  );

};