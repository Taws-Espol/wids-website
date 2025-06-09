import React, { useRef } from 'react';
import useIntersectionObserver from './../../../shared/Hook_scroll';

export default function Sponsor(
  { name, website, logo },
  animationClass = 'animate-fadeInFromBottom',
) {
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  const style = {
    width: name === 'GOOGLE DEEPMIND' ? '500px' : '260px',
    height: name === 'GOOGLE DEEPMIND' ? '150px' : '120px',
  };

  return (
    <div
      ref={cardRef}
      className={`flex font-bold ${isVisible ? animationClass : 'opacity-0'} select-none`}
    >
      <a
        href={website}
        className="flex h-full w-full items-center justify-center text-pink-500"
      >
        <img
          src={logo}
          alt={name}
          style={style}
          className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        />
      </a>
    </div>
  );
}
