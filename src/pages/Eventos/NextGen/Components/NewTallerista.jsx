import React from 'react';

// --- DATOS DE EJEMPLO ---
// En una aplicación real, estos datos vendrían de una API o de las props del componente.
// He replicado los datos de la imagen para que se vea idéntico.
const talleristasData = [
  {
    name: 'Ph.D., Carmen Vaca',
    title: 'Profesora de FIEC, ESPOL',
    imageSrc: 'https://i.imgur.com/L4pP3c2.png', // URL de la imagen de ejemplo
  },
  {
    name: 'Ph.D., Carmen Vaca',
    title: 'Profesora de FIEC, ESPOL',
    imageSrc: 'https://i.imgur.com/L4pP3c2.png',
  },
  {
    name: 'Ph.D., Carmen Vaca',
    title: 'Profesora de FIEC, ESPOL',
    imageSrc: 'https://i.imgur.com/L4pP3c2.png',
  },
  {
    name: 'Ph.D., Carmen Vaca',
    title: 'Profesora de FIEC, ESPOL',
    imageSrc: 'https://i.imgur.com/L4pP3c2.png',
  },
];

/**
 * Componente para una tarjeta de perfil individual de un tallerista.
 * @param {{ profile: { imageSrc: string, name: string, title: string } }} props
 */
function TalleristaProfile({ profile }) {
  return (
    <div className="flex max-w-[200px] flex-col items-center text-center">
      <img
        src={profile.imageSrc}
        alt={`Perfil de ${profile.name}`}
        className="mb-4 h-36 w-36 rounded-full border-2 border-white object-cover shadow-lg"
      />
      {/* El color del texto y del subrayado se ajusta para parecerse al de la imagen */}
      <h3 className="text-lg font-bold text-[#004A4C] underline decoration-1 underline-offset-4">
        {profile.name}
      </h3>
      <p className="mt-1 text-base text-gray-600">{profile.title}</p>
    </div>
  );
}

/**
 * Componente principal que renderiza la rejilla de talleristas.
 * @param {{ talleristas: Array<Object> }} props - Recibe un arreglo de talleristas.
 */
export function TalleristasGrid({ talleristas }) {
  return (
    <div className="w-full font-sans">
      {/* Línea decorativa superior, como en la imagen */}
      {/* Contenedor de la rejilla flexible y responsiva */}
      <div className="flex flex-row flex-wrap items-start justify-center gap-x-8 gap-y-12">
        {talleristas.map((tallerista, index) => (
          <TalleristaProfile key={index} profile={tallerista} />
        ))}
      </div>
    </div>
  );
}

// --- COMPONENTE LISTO PARA USAR ---
// Este es el componente final que puedes exportar y usar en tu aplicación.

export default function NewTallerista() {
  // Aquí usarías los datos que vienen de `edicionData.talleres`
  // Por ahora, usamos los datos de ejemplo de arriba.
  const talleristas = talleristasData;

  return <TalleristasGrid talleristas={talleristas} />;
}
