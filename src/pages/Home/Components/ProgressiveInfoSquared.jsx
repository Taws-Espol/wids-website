import React, { useState, useEffect, useRef } from 'react';
import useIntersectionObserver from '../../../shared/Hook_scroll';

export function ProgressiveInfoSquared({ number, text, color, m_top, delay }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const end =
      typeof number === 'string' && number.startsWith('+')
        ? parseInt(number.slice(1))
        : number;
    if (end === 0) return;

    const increment = end / (duration / 20);
    let start = 0;
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.min(Math.round(start), end));
      if (start >= end) clearInterval(timer);
    }, 20);

    return () => clearInterval(timer);
  }, [number, isVisible]);

  return (
    <div
      ref={ref}
      className={`mt-3 flex w-auto flex-col border-black xl:mr-[-30px] ${color} ${m_top} place-content-center place-items-center gap-5 px-5 text-center text-5xl font-bold transition-all duration-1000 max-md:text-xl max-sm:text-sm xl:gap-1 ${isVisible ? 'animate__animated animate__fadeInLeft' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}s` }} // Add progressive delay
    >
      <p className="w-full text-center text-[12px] text-[#0f0f0f] xl:text-start">
        MÁS DE
      </p>
      <p className="w-full text-center text-[3rem] xl:text-start xl:text-[5rem]">
        {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </p>
      <p className="w-[150px] text-center text-[15px] font-normal text-green-950 xl:w-[200px] xl:text-start xl:text-[20px]">
        {text}
      </p>
    </div>
  );
}
