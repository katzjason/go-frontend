'useClient'
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/app/components/themeProvider';


export default function ToggleTheme() {
  const { setTheme } = useTheme();

  return (
    <div className="flex flex-row p-2 w-[90px] justify-center rounded-lg bg-[rgb(var(--secondary))] self-end">
      <div className="flex flex-row justify-center border-2 border-[rgb(var(--primary))] dark:border-none w-1/2 p-1 rounded-lg">
        <Sun className="w-6 h-6 text-slate-950 dark:text-white text-4xl" onClick={() => setTheme('light')} />
      </div>
      <div className="flex flex-row justify-center border-0 dark:border-2 dark:border-[rgb(var(--primary))] w-1/2 p-1 rounded-lg">
        <Moon className="w-6 h-6 text-slate-950 dark:text-white" onClick={() => setTheme('dark')} />
      </div>
    </div>
  )
}