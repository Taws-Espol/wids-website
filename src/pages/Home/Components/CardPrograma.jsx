import React, { useRef } from 'react';
import useIntersectionObserver from '../../../shared/Hook_scroll/';

export function CardPrograma({ conferencista }) {
  const year = '2024';
  const path_info_crongrama = `/assets/Eventos/Ediciones/${year}/Images/conferencistas/`;
  let image = path_info_crongrama + conferencista.imageName;
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });

  const animationClass = isVisible ? 'animate-fadeInFromBottom' : 'opacity-0';

  return (
    <div
      ref={cardRef}
      className={`font-acumin flex w-[1100px] place-content-start place-items-center gap-10 rounded-md border-2 p-8 hover:border-primary-violet max-xl:w-[700px] max-md:w-[500px] max-sm:w-[375px] max-sm:flex-col max-xsm:w-[300px] ${animationClass}`}
    >
      <div className="flex h-[5rem] w-[5rem] items-center justify-center overflow-hidden rounded-full border-2 sm:h-[4rem] sm:w-[4rem] md:h-[6rem] md:w-[6rem] lg:h-[7rem] lg:w-[7rem] xl:h-[8rem] xl:w-[8rem]">
        <img
          className="h-full w-full object-cover"
          src={image}
          alt="Rounded avatar"
        />
      </div>
      <div className="flex w-4/6 flex-col gap-2 text-justify max-sm:w-full">
        <p
          className={`text-2xl font-bold text-primary-dark-green max-sm:text-xl max-xsm:text-lg ${conferencista.title.length < 15 ? 'max-sm:text-center' : ''}`}
        >
          {conferencista.title}
        </p>
        {conferencista.name ? (
          <p className="text-xl max-xsm:text-base">
            por <strong>{conferencista.name}</strong>, {conferencista.place}
          </p>
        ) : (
          ''
        )}
        <p className="text-xl max-xsm:text-base">{conferencista.work}</p>
      </div>
    </div>
  );
}
