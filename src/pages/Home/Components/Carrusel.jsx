import React from 'react';
import { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { infoImages } from '../../../data/info-Carrusel.js';
import { Timer } from './Timer.jsx';
import '../../../index.css'; // Asegúrate de que el path sea correcto.

export default function Carrusel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousImage = () => {
    const isfisrtImage = currentIndex === 0;
    const newIndex = isfisrtImage ? infoImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextImage = () => {
    const isLastImage = currentIndex === infoImages.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  // Second div left
  // Third div right
  const linksForm = [
    'https://forms.gle/K49hcMVpajuw2QgT6',
    'https://docs.google.com/forms/d/e/1FAIpQLSdhNss5S8yXrnr2nZdPmuNOwk2RZl56Hf8TtMXnpBXBWXECtA/viewform',
  ];
  return (
    <div className="group relative m-0 h-[1000px] w-full">
      <div
        style={{ backgroundImage: `url(${infoImages[currentIndex].url})` }}
        className="h-full w-full bg-opacity-50 bg-cover bg-center duration-500"
      ></div>
      <div className="absolute left-5 top-[50%] hidden translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:z-20 group-hover:block">
        <BsChevronCompactLeft onClick={previousImage} size={30} />
      </div>
      <div className="absolute right-5 top-[50%] hidden translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:z-20 group-hover:block">
        <BsChevronCompactRight onClick={nextImage} size={30} />
      </div>
      <div className="relative bottom-[20vw] flex place-content-center sm:bottom-[17vw] md:bottom-[16vw] xl:absolute xl:bottom-[50px] xl:right-10">
        <Timer
          key={currentIndex}
          Event_date={new Date(infoImages[currentIndex].dateTimer)}
        />
      </div>
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden group-hover:z-10">
        <div className="text-shadow-black font-acumin absolute left-[-35%] top-[-72%] h-full w-full select-none overflow-hidden rounded-full bg-primary-yellow text-white xsm:left-[-40%] xsm:top-[-67%] sm:left-[-45%] sm:top-[-60%] md:left-[-45%] md:top-[-57%] lg:top-[-50%] xl:left-[-1220px] xl:top-[-50%] xl:h-[1900px] xl:w-[1900px]"></div>
      </div>
      <div className="text-shadow-black max-xl:left-15 font-acumin absolute left-[5vw] top-[35%] flex select-none flex-col gap-4 text-primary-dark-green group-hover:z-20 max-xl:top-10 max-xl:gap-[1.5vw] 5xl:left-[3%]">
        <p className="font-acumin text-[7vw] font-bold xsm:text-[5vw] sm:text-[vw] xl:text-[3.5em] 2xl:text-[4em] 5xl:text-[4em]">
          {infoImages[currentIndex].title}
        </p>
        <p className="font-acumin text-[4vw] font-normal xsm:text-[4vw] sm:text-[3vw] xl:text-[2.5em] 2xl:text-[3em] 5xl:text-[3em]">
          {infoImages[currentIndex].date}
        </p>
        <p className="font-acumin text-[4vw] font-normal xsm:text-[4vw] sm:text-[3vw] xl:text-[2.5em] 2xl:text-[3em] 5xl:text-[3em]">
          {infoImages[currentIndex].place}
        </p>
        <p className="font-acumin text-[4vw] font-normal xsm:text-[4vw] sm:text-[3vw] xl:text-[2.5em] 2xl:text-[3em] 5xl:text-[3em]">
          {infoImages[currentIndex].uni}
        </p>
        <div
          className={`${infoImages[currentIndex].linkform ? 'block' : 'hidden'}`}
        >
          <button
            className="font-acumin mt-3 w-52 select-none rounded-3xl bg-primary-dark-green py-3 text-center text-4xl font-medium text-white max-sm:w-32 max-sm:text-2xl lg:w-2/3 lg:text-5xl"
            onClick={() =>
              window.open(infoImages[currentIndex].linkform, '_blank')
            }
          >
            Registro
          </button>
        </div>
      </div>
    </div>
  );
}
