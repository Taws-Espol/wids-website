import React from "react";

export function ButtonEditionComponents({text,changeButton}){
    return (
        <div className="bg-primary-acc-violet rounded-lg text-white text-center w-52 h-14 flex place-content-center place-items-center text-2xl font-acumin
        max-lg:h-16 max-lg:text-3xl"
        onClick={changeButton}>
            {text}
        </div>
    );
}