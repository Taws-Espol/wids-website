import React from 'react';
export function ButtonEditionComponents({ text, changeButton, active }) {
  return (
    <div
      className={`font-acumin flex h-14 w-52 place-content-center place-items-center rounded-lg bg-primary-acc-violet text-center text-2xl max-lg:h-16 max-lg:text-3xl ${active == text ? 'bg-primary-blue text-white' : 'bg-slate-50 text-black'}`}
      onClick={changeButton}
    >
      {text}
    </div>
  );
}
