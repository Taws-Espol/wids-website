import React, { useState, useEffect, useRef } from "react";
import useIntersectionObserver from "./../../../shared/Hook_scroll";

export function InfoSquared({ number, text, color, m_top }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500;
    const end =
      typeof number === "string" && number.startsWith("+")
        ? parseInt(number.slice(1))
        : number;
    if (end === 0) return;

    const increment = end / (duration / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.min(Math.round(start), end));
      if (start >= end) clearInterval(timer);
    }, 100);

    return () => clearInterval(timer);
  }, [number, isVisible]);

  return (
    <div
      ref={ref}
      className={`w-[250px] flex flex-col ${color} ${m_top} text-5xl  font-bold place-content-center place-items-center text-center px-5 gap-5  max-sm:text-sm max-md:text-xl`}
    >
      <p className="text-[#727272] w-full text-[12px] text-center md:text-start">
        OVER
      </p>
      <p className="xl:text-[4rem] text-[3.5rem]">
        {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </p>
      <p className="w-full text-center xl:text-start text-green-950 text-[1.2rem] xl:text-[2rem] font-light ">
        {text}
      </p>
    </div>
  );
}
