import React, { useRef } from "react";
import useIntersectionObserver from "./../../../shared/Hook_scroll";

export default function Sponsor( data, animationClass = "animate-fadeInFromBottom" ) {
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  const width = data.name === "GOOGLE DEEPMIND" ? "300px" : "224px";
  
  return (
    <div
      ref={cardRef}
      className={`flex w-[${width}] h-[112px] items-center justify-center font-bold ${isVisible ? animationClass : "opacity-0"} select-none`}
    >
      <a href={data.website} className="text-pink-500 w-full h-full flex justify-center items-center">
        <img
          src={data.logo}
          alt={data.name}
          className={`w-[${width}] h-[112px] object-contain transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 pr-4`}
        />
      </a>
    </div>
  );
}
