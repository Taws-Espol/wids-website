import React from 'react';

// --- DATOS DE EJEMPLO ---
// En una aplicación real, estos datos vendrían de una API o de las props del componente.
// He replicado los datos de la imagen para que se vea idéntico.

/**
 * Componente para una tarjeta de perfil individual de un tallerista.
 * @param {{ profile: { imageSrc: string, name: string, title: string } }} props
 */
function TalleristaProfile({ profile }) {
  return (
    <div className="flex max-w-[200px] flex-col items-center text-center">
      <img
        src={`/assets/Eventos/Ediciones/2025/Images/conferencistas/${profile.image}`}
        alt={`Perfil de ${profile.info}`}
        className="mb-4 h-36 w-36 rounded-full border-2 border-white object-cover shadow-lg"
      />
      {/* El color del texto y del subrayado se ajusta para parecerse al de la imagen */}
      <h3 className="text-lg font-bold text-[#004A4C] underline decoration-1 underline-offset-4">
        {profile.info}
      </h3>
      <p className="mt-1 text-base text-gray-600">{profile.work}</p>
    </div>
  );
}

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

export default function NewTallerista({ infotallertista }) {
  // Aquí usarías los datos que vienen de `edicionData.talleres`
  // Por ahora, usamos los datos de ejemplo de arriba.
  const talleristas = infotallertista;
  console.log(talleristas);
  talleristas.forEach((tallerista, index) => {
    console.log(`Tallerista ${index + 1}:`);
    console.log('Info:', tallerista.info);
    console.log('Image:', tallerista.image);
    console.log('Work:', tallerista.work);
  });

  return <TalleristasGrid talleristas={talleristas} />;
}
