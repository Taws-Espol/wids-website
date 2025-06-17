import React from 'react';
import { useState, useEffect } from 'react';
import { infoImages } from '../../../data/info-Carrusel.js';
import { Timer } from './Timer.jsx';
import '../../../index.css';

export default function Carrusel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const isLastImage = prevIndex === infoImages.length - 1;
        return isLastImage ? 0 : prevIndex + 1;
      });
    }, 10000); // 10 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="group relative w-full overflow-hidden bg-gray-100">
      {/* Container principal */}
      <div className="relative h-[300px] w-full sm:h-[350px] md:h-[400px] lg:h-[450px]">
        {/* Imagen de fondo */}
        <div
          style={{ backgroundImage: `url(${infoImages[currentIndex].url})` }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        />

        {/* Bloque amarillo rectangular como en la imagen */}
        <div className="clip-path-diagonal absolute left-0 top-0 z-10 h-full w-[200px] bg-primary-yellow sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[400px]">
          {/* Forma diagonal usando CSS personalizado */}
          <div
            className="absolute inset-0 bg-primary-yellow"
            style={{
              clipPath: 'polygon(0 0, 85% 0, 70% 100%, 0% 100%)',
            }}
          ></div>
        </div>

        {/* Contenido de texto sobre el bloque amarillo */}
        <div className="absolute left-6 top-8 z-20 max-w-[45%] sm:left-8 sm:top-10 sm:max-w-[40%] md:left-10 md:top-12 md:max-w-[35%] lg:left-12 lg:top-16">
          {/* Título */}
          <h1 className="mb-2 font-acumin text-lg font-bold uppercase leading-tight tracking-wide text-primary-dark-green sm:mb-3 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            {infoImages[currentIndex].title}
          </h1>

          {/* Fecha */}
          <p className="mb-1 font-acumin text-sm font-medium text-primary-dark-green sm:mb-2 sm:text-base md:text-lg lg:text-xl">
            {infoImages[currentIndex].date}
          </p>

          {/* Lugar */}
          <p className="mb-2 font-acumin text-sm font-medium text-primary-dark-green sm:mb-3 sm:text-base md:text-lg lg:text-xl">
            {infoImages[currentIndex].place}
          </p>

          {/* Universidad */}
          <p className="mb-4 font-acumin text-sm font-medium text-primary-dark-green sm:mb-6 sm:text-base md:text-lg lg:text-xl">
            {infoImages[currentIndex].uni}
          </p>

          {/* Botón de registro */}
          {infoImages[currentIndex].linkform && (
            <button
              className="transform rounded-full bg-primary-dark-green px-4 py-2 font-acumin text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-opacity-90 hover:shadow-xl sm:px-6 sm:py-3 sm:text-sm md:px-8 md:py-3 md:text-base lg:text-lg"
              onClick={() =>
                window.open(infoImages[currentIndex].linkform, '_blank')
              }
            >
              Registro
            </button>
          )}
        </div>

        {/* Timer - Posicionado como en la imagen original */}
        <div className="absolute bottom-4 right-4 z-20 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8">
          <Timer
            key={currentIndex}
            Event_date={new Date(infoImages[currentIndex].dateTimer)}
          />
        </div>
      </div>
    </div>
  );
}
