import React, { useRef } from "react";
import useIntersectionObserver from "./../../../shared/Hook_scroll";

export default function Sponsor(
  data,
  animationClass = "animate-fadeInFromBottom"
) {
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  return (
    <div
      ref={cardRef}
      className={`flex w-[350px] items-center font-bold ${
        isVisible ? animationClass : "opacity-0"
      } select-none`}
    >
      <div className="flex border-r-2 border-gray-400 !w-[230px] !h-[112px]">
        <img
          src={data.logo}
          alt={data.name}
          className="!w-[224px] !h-[112px] transition ease-in-out
            delay-150 hover:-translate-y-1 hover:scale-110 duration-300 pr-4"
        />
      </div>
      <div className="ml-4 pl-4 flex flex-col !w-[120px] !h-[112px] place-content-center place-items-center">
        <div className="">
          <p>{data.name}</p>
          {data.website ? (
            <a href={data.website} className="text-pink-500">
              Ir al sitio web
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
