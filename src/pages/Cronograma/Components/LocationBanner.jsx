import React from 'react';

// --- Ícono de Mapa (Opcional) ---
const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="mr-2 h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </svg>
);

export default function LocationBanner({ title, address, mapLink }) {
  return (
    <div className="w-full bg-white px-8 py-6">
      <div className="flex max-w-6xl items-center justify-between">
        {/* Contenedor para el Título y la Dirección */}
        <div className="px-4">
          <h2 className="text-3xl font-bold text-[#004425]">{title}</h2>
          <p className="text-base text-gray-600">{address}</p>
        </div>

        {/* Botón para encontrar la ubicación */}
        <div className="px-4">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex transform items-center justify-center rounded-full bg-[#004425] px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <MapPinIcon />
            Find location
          </a>
        </div>
      </div>
    </div>
  );
}
