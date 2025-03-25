import React, { useState } from 'react';
import styles from './toggleSetting.module.css';

type toggleSettingsProps = {
  instruction: string,
  option1: string,
  option2: string,
  writeable: boolean
  disabled: boolean,
  clickCallback: () => void,
}

export default function ToggleSetting({ instruction, option1, option2, writeable, clickCallback, disabled }: toggleSettingsProps) {
  const [isToggled, setIsToggled] = useState(true);

  const handleClick = () => {
    if (!disabled) {
      setIsToggled(!isToggled);
    }
  }

  return (
    <div className={`${writeable ? styles.writeable : styles.unwriteable} ${styles.container}`}>
      <div className={styles.subcontainer}>
        <h2 className={styles.text}>{instruction}</h2>
      </div>
      <div className={styles.subcontainer} onClick={clickCallback}>
        <rect className={`${isToggled ? styles.toggled : styles.untoggled} ${styles.switch}`}
          onClick={handleClick}>{option1}</rect>
        <rect className={`${isToggled ? styles.untoggled : styles.toggled} ${styles.switch}`}
          onClick={handleClick}>{option2}</rect>
      </div>
    </div >
  );
}