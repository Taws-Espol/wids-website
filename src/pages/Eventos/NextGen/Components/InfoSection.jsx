import React from 'react';

export default function InfoSection({ image1, image2 }) {
  const textRight =
    'Un taller dirigido a jóvenes de bachillerato, el cual se llevará a cabo en los laboratorios de la Facultad de Ingeniería Eléctrica y Computación (FIEC) de la ESPOL.';
  const textLeft =
    'El contenido del taller consta de 3 secciones: La ciencia de datos y por qué es para todas, Explorar y cambiar el mundo con datos, y Tú puedes liderar el futuro de la tecnología, donde las estudiantes podrán reforzar los conocimientos adquiridos.';

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-24 px-6 py-20 font-sans">
      {/* --- Sección Superior: Imagen a la Izquierda | Texto a la Derecha --- */}
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-12 md:flex-row">
        {/* Contenedor de la Imagen Izquierda */}
        <div className="flex w-full justify-center md:w-1/2 md:justify-end">
          <div className="relative w-full max-w-sm">
            {/* Forma decorativa azul - Mejorada para responsive */}
            <div className="absolute left-[-0.75rem] top-[-0.75rem] z-10 h-full w-full bg-cyan-300 sm:left-[-1.5rem] sm:top-[-1.5rem]"></div>
            {/* Imagen */}
            <img
              src={image1}
              alt="Estudiantes en laboratorio de computación"
              className="relative z-20 h-auto w-full object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Contenedor del Texto Derecho */}
        <div className="w-full text-center md:w-1/2 md:text-left">
          <p className="text-lg text-gray-800">{textRight}</p>
        </div>
      </div>

      {/* --- Sección Inferior: Texto a la Izquierda | Imagen a la Derecha --- */}
      <div className="flex w-full max-w-5xl flex-col-reverse items-center justify-center gap-12 md:flex-row">
        {/* Contenedor del Texto Izquierdo */}
        <div className="w-full text-center md:w-1/2 md:text-left">
          <p className="text-lg text-gray-800">{textLeft}</p>
        </div>

        {/* Contenedor de la Imagen Derecha */}
        <div className="flex w-full justify-center md:w-1/2 md:justify-start">
          <div className="relative w-full max-w-sm">
            {/* Forma decorativa violeta - Mejorada para responsive */}
            <div className="absolute bottom-[-0.75rem] right-[-0.75rem] z-10 h-full w-full bg-violet-300 sm:bottom-[-1.5rem] sm:right-[-1.5rem]"></div>
            {/* Imagen */}
            <img
              src={image2}
              alt="Estudiantes colaborando en un proyecto"
              className="relative z-20 h-auto w-full object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
