import React, { useRef } from "react";
import useIntersectionObserver from "../../../shared/Hook_scroll/";

export function CardPrograma({ conferencista }) {
  const year = "2024";
  const path_info_crongrama = `/assets/Eventos/Ediciones/${year}/Images/conferencistas/`;
  let image = path_info_crongrama + conferencista.imageName;
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });

  const animationClass = isVisible ? "animate-fadeInFromBottom" : "opacity-0";

  return (
    <div
      ref={cardRef}
      className={`flex place-content-start place-items-center p-8 gap-10 border-2 rounded-md hover:border-primary-violet w-[1100px] font-acumin max-md:w-[500px] max-xl:w-[700px] max-xsm:w-[300px] max-sm:w-[375px] max-sm:flex-col ${animationClass}`}
    >
      <div className="flex justify-center items-center rounded-full overflow-hidden border-2  w-[5rem] h-[5rem] sm:w-[4rem] sm:h-[4rem] md:w-[6rem] md:h-[6rem] lg:w-[7rem] lg:h-[7rem] xl:w-[8rem] xl:h-[8rem]">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt="Rounded avatar"
        />
      </div>
      <div className="flex flex-col gap-2 text-justify w-4/6 max-sm:w-full">
        <p
          className={`text-2xl text-primary-dark-green font-bold max-xsm:text-lg max-sm:text-xl ${conferencista.title.length < 15 ? "max-sm:text-center" : ""}`}
        >
          {conferencista.title}
        </p>
        {conferencista.name ? (
          <p className="text-xl max-xsm:text-base">
            por <strong>{conferencista.name}</strong>, {conferencista.place}
          </p>
        ) : (
          ""
        )}
        <p className="text-xl max-xsm:text-base">{conferencista.work}</p>
      </div>
    </div>
  );
}
