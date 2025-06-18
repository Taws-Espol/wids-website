import React from 'react';
import { useState, useEffect } from 'react';
import { infoImages } from '../../../data/info-Carrusel.js'; // Asegúrate que la ruta sea correcta
import { Timer } from './Timer.jsx'; // Asegúrate que la ruta sea correcta
import '../../../index.css'; // Asegúrate que la ruta sea correcta

// Datos de ejemplo por si infoImages no carga
const infoImagesExample = [
  {
    url: 'https://images.unsplash.com/photo-1582653429934-20a2da35d0bf?q=80&w=2070&auto=format&fit=crop',
    title: 'Conferencia',
    date: '13 de Julio, 2024',
    place: 'ESPOL, Guayaquil',
    uni: '',
    linkform: '#',
    dateTimer: '2024-07-13T09:00:00',
  },
  {
    url: 'https://images.unsplash.com/photo-1573496773905-f5b17e76b254?q=80&w=2070&auto=format&fit=crop',
    title: 'Taller de Liderazgo',
    date: '25 de Agosto, 2025',
    place: 'UCSG, Guayaquil',
    uni: '',
    linkform: '#',
    dateTimer: '2025-08-25T10:00:00',
  },
];

// --- Componentes para los íconos de las flechas (SVG) ---
const LeftArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
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
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);

export default function Carrusel() {
  // --- CAMBIO: Se lee el índice guardado en localStorage al iniciar ---
  const [currentIndex, setCurrentIndex] = useState(() => {
    const savedIndex = localStorage.getItem('carouselIndex');
    // Si existe un índice guardado y es válido, úsalo. Si no, empieza en 0.
    return savedIndex !== null ? Number(savedIndex) : 0;
  });

  // --- CAMBIO: Se añade un useEffect para guardar el índice en localStorage cada vez que cambia ---
  useEffect(() => {
    localStorage.setItem('carouselIndex', currentIndex);
  }, [currentIndex]);

  // --- CAMBIO: El auto-play ahora depende de `currentIndex` para reiniciarse ---
  useEffect(() => {
    const interval = setInterval(() => {
      // La lógica interna de cambio es la misma
      setCurrentIndex((prevIndex) =>
        prevIndex === infoImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 10000); // 10 segundos

    // La limpieza sigue funcionando igual
    return () => clearInterval(interval);
  }, [currentIndex]); // Añadimos currentIndex como dependencia

  // --- NUEVO: Funciones para manejar la navegación manual ---
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? infoImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === infoImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Se usan los datos reales, con fallback a los de ejemplo
  const currentEvent =
    infoImages[currentIndex] || infoImagesExample[currentIndex];

  return (
    // Se añade `group` para que las flechas aparezcan al hacer hover sobre el carrusel
    <div className="group relative h-[450px] w-full overflow-hidden bg-gray-100 md:h-[500px]">
      <div className="relative h-full w-full">
        {/* --- Imagen de fondo --- */}
        <div
          style={{ backgroundImage: `url(${currentEvent.url})` }}
          className="absolute inset-0 h-full w-full bg-cover bg-center transition-all duration-700"
        />

        <div className="absolute inset-0 h-full w-full bg-black bg-opacity-10"></div>
        <div className="absolute left-0 top-1/2 h-[800px] w-[1200px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-400"></div>
        <div className="absolute left-[290px] top-[60px] z-10 h-16 w-[400px] bg-yellow-300"></div>

        <div className="absolute left-6 top-1/2 z-20 w-[400px] -translate-y-1/2 transform pl-4 text-center md:left-[100px]">
          <h1 className="mb-3 font-sans text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl">
            {currentEvent.title}
          </h1>
          <p className="mb-6 font-sans text-base text-gray-700 md:text-lg">
            {currentEvent.date} <br /> {currentEvent.place}
          </p>
          {currentEvent.linkform && (
            <a
              href={currentEvent.linkform}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transform rounded-full bg-[#004425] px-8 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Ir a la página
            </a>
          )}
        </div>

        <div className="absolute bottom-6 right-6 z-20 md:bottom-8 md:right-8">
          <Timer
            key={currentIndex} // La key asegura que el Timer se reinicie si el evento cambia
            Event_date={new Date(currentEvent.dateTimer)}
          />
        </div>
      </div>

      {/* --- NUEVO: Flechas de Navegación --- */}
      {/* Flecha Izquierda */}
      <div
        onClick={goToPrevious}
        className="absolute left-5 top-1/2 z-30 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <LeftArrowIcon />
      </div>
      {/* Flecha Derecha */}
      <div
        onClick={goToNext}
        className="absolute right-5 top-1/2 z-30 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <RightArrowIcon />
      </div>
    </div>
  );
}
