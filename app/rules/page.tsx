'use client';
import React from 'react';
import Layout from '../components/layout';


export default function Rules() {
  return (
    <Layout>
      <div className="w-full flex justify-center mt-4 lg:mt-10">
        <div className="flex flex-col justify-center items-center w-[80%]">
          <div className="text-2xl lg:text-3xl mb-6 text-[rgb(var(--text))] font-bold">Basic Rules of Go</div>
          <div>
            <ol className="text-[rgb(var(--text))] text-xl lg:text-2xl p-8">
              <li className="mb-4 list-decimal"><span className="font-bold">Game Start: </span>Black moves first, White moves second. Stones are placed on the board&apos;s intersections by clicking them; press 'Space' to pass your turn.</li>
              <li className="mt-4 mb-4 list-decimal"><span className="font-bold">Stone Movement: </span>Stones do not move after being placed—they stay put unless captured.</li>
              <li className="mt-4 mb-4 list-decimal"><span className="font-bold">Capturing Stones: </span>Stones are captured when they are completely surrounded on all four sides (up/down/left/right) by opponent stones = they have zero liberties.</li>
              <li className="mt-4 mb-4 list-decimal"><span className="font-bold">Liberties: </span>Empty intersections surrounding the stone: zero liberties = capture.</li>
              <li className="mt-4 mb-4 list-decimal"><span className="font-bold">No Suicide: </span>You cannot place a stone where it would have no liberties unless it captures an opponent stone in the process.</li>
              <li className="mt-4 mb-4 list-decimal"><span className="font-bold">Groups: </span>Stones connected in the horizontal or vertical direction (not diagonal) are considered a group. Groups share liberties and are captured all at once.</li>
              <li className="mt-4 mb-4 list-decimal"><span className="font-bold">Ko: </span>You cannot make a move that would recreate the exact same board position as the turn before (this is prevented automatically).</li>
              <li className="mt-4 mb-4 list-decimal"><span className="font-bold">Territory: </span>Control more territory (empty spaces surrounded by your stones only) than your opponent by the end of the game.</li>
              <li className="mt-4 mb-4 list-decimal"><span className="font-bold">Scoring: </span>Your territory + the number of enemy stones you captured = your score. The player with a higher score wins.</li>
              <li className="mt-4 mb-4 list-decimal"><span className="font-bold">Passing: </span>When both players pass their turn consecutively, the game ends.</li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
}