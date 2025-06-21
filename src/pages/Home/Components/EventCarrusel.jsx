import React, { useState, useEffect } from 'react';

const LeftArrowIcon = () => (
  <svg
    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </svg>
);

const RightArrowIcon = () => (
  <svg
    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);

export default function EventCarrucel({ slides = [], fixedText }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const current = slides[currentIndex];

  return (
    <div className="group relative h-[350px] w-full overflow-hidden sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
      <div className="relative flex h-full w-full flex-col md:flex-row">
        {/* Imagen al fondo */}
        <img
          src={current.url}
          alt="evento"
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        />

        {/* Overlay para mejor contraste - solo en desktop donde hay texto */}
        <div className="z-5 absolute inset-0 hidden bg-black bg-opacity-10 md:block"></div>

        {/* Capa con fondo semicircular y texto - Solo visible en desktop */}
        <div className="relative z-10 hidden w-full items-center justify-center py-8 md:flex md:w-[50%]">
          {/* Círculo decorativo */}
          <div className="absolute left-[-50px] top-[50%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-400 lg:h-[1000px] lg:w-[1000px] xl:h-[1200px] xl:w-[1200px]"></div>

          {/* Contenido del texto */}
          <div className="z-10 flex max-w-md flex-col items-center justify-center pl-16 text-center md:ml-[-200px] md:pl-20 lg:pl-24 xl:ml-[-450px]">
            <h1 className="mb-4 text-4xl font-bold text-green-900 lg:text-5xl xl:text-6xl">
              {fixedText.title}
            </h1>
            <p className="mb-4 w-[200px] text-xl text-green-900 lg:text-2xl">
              {fixedText.description}
            </p>
            <p className="text-xl text-green-900 lg:text-2xl">
              {fixedText.date}
            </p>
          </div>
        </div>
      </div>

      {/* Flechas de navegación - mejoradas para móviles */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:left-3 sm:p-2 md:left-5 md:flex"
      >
        <LeftArrowIcon />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:right-3 sm:p-2 md:right-5 md:flex"
      >
        <RightArrowIcon />
      </button>

      {/* Indicadores de posición - solo en móviles */}
      <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 transform space-x-2 sm:bottom-4 md:hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
