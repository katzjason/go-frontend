import styles from './board.module.css';

export default function Board() {
  return (
    <div>
      <svg width="54rem" height="36rem">
        <g>
          <rect fill="#D8B589" width="100%" height="100%"></rect>
          <line x1="100" y1="0" x2="100" y2="100" className={styles.boardLine}></line>
        </g>
      </svg>
    </div>

  );
}