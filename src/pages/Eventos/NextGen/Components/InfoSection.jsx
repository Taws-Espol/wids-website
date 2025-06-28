import React from 'react';

// Puedes reemplazar estas URLs con tus propias imágenes.
const image1 = '../../../../../public/assets/Eventos/NextGen/_MG_2799.jpg';
const image2 = '../../../../../public/assets/Eventos/NextGen/MG_2781.webp';

export default function InfoSection() {
  // Textos extraídos de la imagen
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
            {/* Forma decorativa azul */}
            <div
              id="rectangulo_blue"
              className="absolute left-[-1.5rem] top-[-1.5rem] z-10 h-full w-full bg-cyan-300"
            ></div>
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
            {/* Forma decorativa violeta */}
            <div
              id="shape_purple"
              className="absolute bottom-[-1.5rem] right-[-1.5rem] z-10 h-full w-full bg-violet-300"
            ></div>
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
