import React from 'react';

interface props {
  clickCallback: () => void;
  writeable: boolean;
}

export default function StartButton({ clickCallback, writeable }: props) {
  return (
    <div className={`${writeable ? "" : "opacity-60"} flex items-center justify-center 
                    bg-[rgb(var(--secondary))] rounded-lg w-1/2 xl:w-full self-center mb-4 h-10 xl:h-16`}>
      <div className={`${writeable ? "hover:cursor-pointer border-none" : "hover:cursor-default border-[rgb(var(--primary))]"} 
                    border-2 text-center text-[rgb(var(--text))] text-md xl:text-2xl
                    rounded-lg m-1 xl:m-2 h-8 xl:h-12 flex items-center justify-center w-full`}
        onClick={clickCallback}>Start
      </div>
    </div>
  );

};