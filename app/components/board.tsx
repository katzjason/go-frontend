import styles from './board.module.css';
import React, { useState, useRef, useEffect } from 'react';

interface coordinate {
  x: number;
  y: number;
}

export default function Board({ children }: { children: number[][] }) {
  const [hoverCircle, setHoverCircle] = useState<coordinate | null>(null);
  const boardRef = useRef<SVGRectElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (boardRef.current) {
      const board = boardRef.current.getBoundingClientRect();
      let mouse_x = event.clientX - board.left;
      let mouse_y = event.clientY - board.top;
      if (mouse_x >= 0 && mouse_x <= board.width && mouse_y >= 0 && mouse_y <= board.height) {
        let nearest_x = Math.floor(((mouse_x / board.width) * 100) / 12.5);
        let x_rem = ((mouse_x / board.width) * 100) % 12.5;
        if (x_rem > 6.25) { nearest_x += 1 }
        let nearest_y = Math.floor(((mouse_y / board.height) * 100) / 12.5);
        let y_rem = ((mouse_y / board.height) * 100) % 12.5;
        if (y_rem > 6.25) { nearest_y += 1 }
        let circle_coords: coordinate = { x: nearest_x, y: nearest_y };
        setHoverCircle(circle_coords);
      } else {
        setHoverCircle(null);
      }
    }
  };


  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div>
      <svg className={styles.boardBackground}>
        <g>
          <rect ref={boardRef} className={styles.board} width="90%" height="90%"></rect>
          {/* Vertical lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={i}
              x1={`${5 + (i) * 11.25}%`}
              y1="5%"
              x2={`${5 + (i) * 11.25}%`}
              y2="95%"
              stroke="black"
              strokeWidth="2"
            />
          ))}

          {/* Horizontal lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={i}
              y1={`${5 + (i) * 11.25}%`}
              x1="5%"
              y2={`${5 + (i) * 11.25}%`}
              x2="95%"
              stroke="black"
              strokeWidth="2"
            />
          ))}

          {/* {Hover Circle} */}
          {hoverCircle && (
            <circle
              className={styles.hoverCircle}
              cx={`${5 + hoverCircle.x * 11.25}%`}
              cy={`${5 + hoverCircle.y * 11.25}%`}
              r="3.5%"
            />
          )}

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
        </g>
      </svg>
    </div >

  );
}