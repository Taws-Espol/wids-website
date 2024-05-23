import React from "react";
export function ButtonEditionComponents({text,changeButton,active}){
    return (
        <div className={`bg-primary-acc-violet rounded-lg text-center w-52 h-14 flex place-content-center place-items-center text-2xl font-acumin
        max-lg:h-16 max-lg:text-3xl ${active==text ? 'bg-primary-blue text-white':'bg-slate-50 text-black'}`}
        onClick={changeButton}>
            {text}
        </div>
    );
}