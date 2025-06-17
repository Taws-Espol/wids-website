import React from 'react';
import imagen1 from '../../../../public/assets/Conferences/conference.webp';
export default function ConferenceBanner() {
  return (
    <div className="w-full">
      {/* Imagen de fondo */}
      <section
        className="relative h-[350px] w-full bg-cover bg-center"
        style={{
          backgroundImage: `url('${imagen1}')`, // Asegúrate de actualizar la ruta
        }}
      ></section>

      {/* Contenido debajo de la imagen */}
      <div className="bg-white px-4 py-10 text-center">
        <h2 className="mb-4 text-4xl font-bold text-primary-dark-green">
          Conferencia WIDS
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          ¡Únete a nosotros este sábado 19 de julio para un día lleno de
          inspiración y conocimiento en las conferencias de WIDS en ESPOL!
        </p>
        <a
          href="#"
          className="rounded-full bg-teal-600 px-8 py-3 text-lg font-semibold text-white hover:bg-teal-700"
        >
          Regístrate aquí
        </a>
      </div>
    </div>
  );
}
