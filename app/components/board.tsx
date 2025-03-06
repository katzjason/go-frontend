import styles from './board.module.css';

export default function Board({ children }: { children: number[][] }) {
  return (
    <div>
      <svg className={styles.boardBackground}>
        <g>
          <rect className={styles.board} width="90%" height="90%"></rect>
          {/* Vertical lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={i}
              x1={`${5 + (i) * 11.25}%`} // Set starting X position
              y1="5%" // Start at the top
              x2={`${5 + (i) * 11.25}%`} // Keep same X position
              y2="95%" // Extend to the bottom
              stroke="black" // Line color
              strokeWidth="2" // Line thickness
            />
          ))}

          {/* Horizontal lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={i}
              y1={`${5 + (i) * 11.25}%`} // Set starting X position
              x1="5%" // Start at the top
              y2={`${5 + (i) * 11.25}%`} // Keep same X position
              x2="95%" // Extend to the bottom
              stroke="black" // Line color
              strokeWidth="2" // Line thickness
            />
          ))}

          {/* Drawing Stones */}
          {children.map((row, row_i) => row.map((col, col_i) => {
            if (children[row_i][col_i] == 1) {
              return (
                <circle key={row_i * 10 + col_i}
                  className={styles.blackStone}
                  cx={`${5 + (col_i) * 11.25}%`}
                  cy={`${5 + (row_i) * 11.25}%`}
                  r="3.5%"
                ></circle>
              );
            } else if (children[row_i][col_i] == -1) {
              return (
                <circle key={row_i * 10 + col_i}
                  className={styles.whiteStone}
                  cx={`${5 + (col_i) * 11.25}%`}
                  cy={`${5 + (row_i) * 11.25}%`}
                  r="3.5%"
                ></circle>
              )
            } else {
              return
            }




          })
          )}

          {/* {children.map((row, row_i) => row.map((col, col_i) => {
            children[row_i][col_i] == 1 ?
              <circle key={(row_i + 100 + col_i)}
                className={styles.blackStone}
                cx={`${5 + (col_i) * 11.25}%`}
                cy={`${5 + (row_i) * 11.25}%`}
                r={`${3.5}%`}></circle>
              : (children[row_i][col_i] == -1 ?
                <circle></circle> : null
              )
          }
          ))} */}
        </g>
        {/* <circle className={styles.whiteStone} cx="5%" cy="5%" r="3.5%"></circle>
        <circle className={styles.blackStone} cx="5%" cy="16.25%" r="3.5%"></circle>
        <circle className={styles.blackStone} cx="16.25%" cy="5%" r="3.5%"></circle> */}
      </svg>
    </div >

  );
}