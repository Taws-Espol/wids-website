import React, { useState, useEffect } from 'react';

const LeftArrowIcon = () => (
  <svg
    className="h-6 w-6"
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
    className="h-6 w-6"
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
    <div className="group relative h-[500px] w-full overflow-hidden md:h-[600px] lg:h-[700px]">
      <div className="relative flex h-full w-full flex-col md:flex-row">
        {/* Imagen al fondo */}
        <img
          src={current.url}
          alt="evento"
          className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        />

        {/* Capa con fondo semicircular y texto */}
        <div className="relative z-10 flex w-full items-center justify-center py-8 md:w-[45%]">
          <div className="absolute left-1/2 top-[0%] h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-400 md:left-[-100px] md:top-[60%] md:h-[1400px] md:w-[1400px]"></div>
          <div className="z-10 max-w-md p-6 text-center md:p-10 md:text-left">
            <h1 className="mb-4 text-3xl font-bold text-green-900 md:text-4xl lg:text-5xl">
              {fixedText.title}
            </h1>
            <p className="mb-4 text-base text-green-900 md:text-lg">
              {fixedText.description}
            </p>
            <p className="text-sm text-green-900 md:text-base">
              {fixedText.date}
            </p>
          </div>
        </div>
      </div>

      {/* Flechas de navegación */}
      <button
        onClick={goToPrevious}
        className="absolute left-5 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition group-hover:opacity-100 md:flex"
      >
        <LeftArrowIcon />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-black/30 p-2 text-white opacity-0 transition group-hover:opacity-100 md:flex"
      >
        <RightArrowIcon />
      </button>
    </div>
  );
}
