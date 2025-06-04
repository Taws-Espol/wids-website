import React, { useRef } from "react";
import useIntersectionObserver from "../../../shared/Hook_scroll";

export default function Club(
  { name, website, logo },
  animationClass = "animate-fadeInFromBottom",
) {
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  const style = {
    width: name === "GOOGLE DEEPMIND" ? "500px" : "260px",
    height: name === "GOOGLE DEEPMIND" ? "150px" : "120px",
  };

  return (
    <div
      ref={cardRef}
      className={`flex font-bold ${isVisible ? animationClass : "opacity-0"} select-none`}
    >
      <div
        href={website}
        className="text-pink-500 w-full h-full flex justify-center items-center"
      >
        <img
          src={logo}
          alt={name}
          style={style}
          className="transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110"
        />
      </div>
    </div>
  );
}
