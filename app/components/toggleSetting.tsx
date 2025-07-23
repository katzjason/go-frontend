import React, { useState } from 'react';

type toggleSettingsProps = {
  option1: string,
  option2: string,
  writeable: boolean
  disabled: boolean,
  clickCallback: () => void,
}

export default function ToggleSetting({ option1, option2, writeable, clickCallback, disabled }: toggleSettingsProps) {
  const [isToggled, setIsToggled] = useState(true);

  const handleClick = () => {
    if (!disabled) {
      setIsToggled(!isToggled);
      clickCallback();
    }
  }

  return (
    <div className={`${writeable ? "" : "opacity-60"} flex flex-row bg-[rgb(var(--secondary))] rounded-lg w-1/2 xl:w-full mb-2 xl:mb-4 justify-center h-10 xl:h-16`}>
      <div className={`${isToggled ? "border-[rgb(var(--primary))]" : "border-none"}
                      w-1/2 text-center text-[rgb(var(--text))] text-md xl:text-2xl border-2
                      rounded-lg m-1 xl:m-2 h-8 xl:h-12 flex items-center justify-center ${writeable ? "hover:cursor-pointer" : "hover:cursor-default"}`}
        onClick={handleClick}>{option1}</div>
      <div className={`${isToggled ? "border-none" : "border-[rgb(var(--primary))]"}
                      w-1/2 text-center text-[rgb(var(--text))] text-md xl:text-2xl border-2
                      rounded-lg m-1 xl:m-2 h-8 xl:h-12 flex items-center justify-center ${writeable ? "hover:cursor-pointer" : "hover:cursor-default"}`}
        onClick={handleClick}>{option2}</div>
    </div >
  );
}