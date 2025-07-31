'useClient'
import { Moon, Sun, HelpCircle } from 'lucide-react';
import { useTheme } from '@/app/components/themeProvider';
import { useState } from 'react';


export default function ToggleTheme() {
  const { setTheme } = useTheme();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="flex flex-row">
      <button
        onClick={() => setShowHelp((prev) => !prev)}
        className="p-2 rounded-lg hover:bg-[rgb(var(--secondary))] transition mr-4"
        aria-label="Help"
      >
        <HelpCircle className="w-8 h-8 text-slate-950 dark:text-white" />
      </button>
      {
        showHelp && (
          <div className="absolute top-16 right-1/5 -translate-x-1/2 xl:-translate-x-2/3 mt-2 w-72 xl:w-96 p-3 rounded-lg shadow-lg bg-white dark:bg-gray-800 text-md xl:text-2xl text-gray-800 dark:text-gray-100 z-50">
            <span className="font-bold">Tips on getting started:</span> Click your game mode (1v1 or vsAI), then a scoring method (area or territory), then click start. Click the board to place a stone or press &apos;Space&apos; to pass your turn
          </div>
        )
      }
      <div className="flex flex-row p-2 w-[90px] justify-center rounded-lg bg-[rgb(var(--secondary))] self-end">
        <div className="flex flex-row justify-center border-2 border-[rgb(var(--primary))] dark:border-none w-1/2 p-1 rounded-lg">
          <Sun className="w-6 h-6 text-slate-950 dark:text-white text-4xl hover:cursor-pointer" onClick={() => setTheme('light')} />
        </div>
        <div className="flex flex-row justify-center border-0 dark:border-2 dark:border-[rgb(var(--primary))] w-1/2 p-1 rounded-lg">
          <Moon className="w-6 h-6 text-slate-950 dark:text-white hover:cursor-pointer" onClick={() => setTheme('dark')} />
        </div>
      </div>
    </div >
  )
}