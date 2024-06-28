import React, { useState, useEffect } from 'react';

export function InfoSquared({ number, text, color }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2500; 
        const end = typeof number === 'string' && number.startsWith('+') ? parseInt(number.slice(1)) : number;
        if (end === 0) return;

        const increment = end / (duration / 100); 
        let start = 0;
        const timer = setInterval(() => {
            start += increment;
            setCount(Math.min(Math.round(start), end));
            if (start >= end) clearInterval(timer);
        }, 100); 

        return () => clearInterval(timer);
    }, [number]);

    return (
        <div className={`h-[360px] flex flex-col aspect-square ${color} text-5xl text-white font-bold place-content-center place-items-center text-center px-5 gap-5 max-sm:h-[120px] max-sm:w-[120px] max-md:h-[200px]  max-md:w-[200px]  max-sm:text-sm max-md:text-xl`}>
            <p className="max-sm:text-xl max-md:text-3xl text-7xl">
                {count}
            </p>
            <p className="max-sm:text-sm max-md:text-lg">
                {text}
            </p>
        </div>
    );
}
