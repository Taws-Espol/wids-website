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
      className={`grid grid-cols-2 font-bold ${
        isVisible ? `${animationClass}` : "opacity-0"
      } select-none`}
    >
      <div className="m-auto">
        <img
          src={data.logo}
          alt={data.name}
          className="!w-56 transition ease-in-out
            delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        />
      </div>
      <div className="ml-4 border-l-2 border-gray-400 pl-4 flex flex-col">
        <div className="my-auto">
          <p>{data.name}</p>
          {/* <div className="flex flex-row items-center">
            <img
              src="/assets/location.webp"
              alt="Ubicación"
              className="h-5 w-auto"
            />
            <p>{data.location}</p>
          </div> */}
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
