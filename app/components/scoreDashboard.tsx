
interface params {
  blackScore: number,
  whiteScore: number,
  gameOver: boolean,
}

export default function ScoreDashBoard({ blackScore, whiteScore, gameOver }: params) {
  return (
    <div className="flex flex-row rounded-lg w-full h-[20%] max-h-[100] m-2 xl:m-8">
      <div className="w-1/2 flex flex-row items-center justify-end p-2">
        <div className="flex flex-col items-center">
          <div className="h-10">
            <span className={`${gameOver && blackScore > whiteScore ? "relative text-3xl xl:text-4xl visible" : "invisible"}`}>👑</span>
          </div>
          <div className={`w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-black flex flex-row items-center 
                        justify-center text-slate-200 text-md xl:text-2xl font-bold border-2 border-2 border-[rgb(var(--primary))]
                        ${gameOver && blackScore > whiteScore ? "border-none ring-4 ring-[rgb(var(--ring))]" :
              (gameOver && blackScore < whiteScore ? "opacity-30" : null)}`}>
            {gameOver ? blackScore : "-"}
          </div>
        </div>

      </div>
      <div className="w-1/2 flex flex-row items-center justify-start p-2">
        <div className="flex flex-col items-center">
          <div className="h-10">
            <span className={`${gameOver && blackScore > whiteScore ? "relative text-3xl xl:text-4xl visible" : "invisible"}`}>👑</span>
          </div>
          <div className={`w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-slate-200 flex flex-row items-center 
                        justify-center text-black text-md xl:text-2xl font-bold border-2 border-[rgb(var(--primary))]
                        ${gameOver && whiteScore > blackScore ? "border-none ring-4 ring-[rgb(var(--ring))]" :
              (gameOver && whiteScore < blackScore ? "opacity-30" : null)}`}>{gameOver ? whiteScore : "-"}
          </div>
        </div>
      </div >
    </div >



  );
}