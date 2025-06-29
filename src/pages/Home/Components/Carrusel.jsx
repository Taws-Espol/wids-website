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
    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
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
    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
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
    <div className="group relative h-[300px] w-full overflow-hidden bg-gray-100 sm:h-[350px] md:h-[450px] lg:h-[500px]">
      <div className="relative h-full w-full">
        {/* --- Imagen de fondo --- */}
        <div
          style={{ backgroundImage: `url(${currentEvent.url})` }}
          className="absolute inset-0 h-full w-full bg-cover bg-center transition-all duration-700"
        />

        <div className="absolute inset-0 h-full w-full bg-black bg-opacity-30"></div>

        {/* Elementos decorativos - se ocultan en móviles para mejor legibilidad */}
        <div className="absolute left-0 top-1/2 hidden h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-yellow-400 sm:block sm:h-[600px] sm:w-[800px] md:h-[800px] md:w-[1200px]"></div>
        <div className="absolute left-[150px] top-[30px] z-10 hidden h-8 w-[200px] bg-yellow-300 sm:block sm:h-12 sm:w-[300px] md:left-[290px] md:top-[60px] md:h-16 md:w-[400px]"></div>

        {/* Contenido principal - optimizado para móviles con mejor contraste */}
        <div className="absolute left-4 top-1/2 z-20 w-[calc(100%-2rem)] max-w-[400px] -translate-y-1/2 transform px-2 text-center sm:left-6 sm:w-[400px] sm:pl-4 md:left-[100px]">
          <h1 className="mb-2 font-sans text-xl font-bold text-white drop-shadow-2xl sm:mb-3 sm:text-2xl md:text-4xl md:text-gray-800 lg:text-5xl xl:text-6xl">
            {currentEvent.title}
          </h1>
          <p className="mb-4 rounded-lg bg-black/40 px-3 py-2 font-sans text-sm text-white backdrop-blur-sm sm:mb-6 sm:bg-transparent sm:px-0 sm:py-0 sm:text-base sm:text-gray-700 sm:backdrop-blur-none md:text-lg">
            {currentEvent.date} <br className="hidden sm:block" />
            <span className="sm:hidden"> - </span>
            {currentEvent.place}
          </p>
          {currentEvent.linkform && (
            <a
              href={currentEvent.linkform}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transform rounded-full bg-[#004425] px-4 py-2 text-sm font-semibold text-white shadow-2xl transition-transform duration-300 hover:scale-105 sm:px-6 sm:py-2.5 sm:text-base md:px-8 md:py-3"
            >
              Regístrate
            </a>
          )}
        </div>

        {/* Timer - oculto en móviles, visible desde tablets */}
        <div className="absolute bottom-6 right-6 z-20 hidden sm:block md:bottom-8 md:right-8">
          <Timer Event_date="2025-07-19T00:00:00" />
        </div>
      </div>

      {/* --- Flechas de Navegación - mejoradas para móviles --- */}
      {/* Flecha Izquierda */}
      <div
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 z-30 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-1.5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:left-3 sm:p-2 md:left-5"
      >
        <LeftArrowIcon />
      </div>
      {/* Flecha Derecha */}
      <div
        onClick={goToNext}
        className="absolute right-2 top-1/2 z-30 -translate-y-1/2 cursor-pointer rounded-full bg-black/30 p-1.5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:right-3 sm:p-2 md:right-5"
      >
        <RightArrowIcon />
      </div>

      {/* --- Indicadores de posición (opcional) - solo visibles en móviles --- */}
      <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 transform space-x-2 sm:hidden">
        {(infoImages.length > 0 ? infoImages : infoImagesExample).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ),
        )}
      </div>
    </div>
  );
}
