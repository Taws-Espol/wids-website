import React from 'react';
import imagen_carrousel from '/public/assets/images-carrusel/Events_Accordion_O.webp'; // Asegúrate de que la ruta sea correcta

export default function SobreNosotros() {
  return (
    <section
      className="relative h-[400px] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${imagen_carrousel})` }}
    >
      {/* Círculo con el texto "Sobre Nosotros" */}
      <div className="absolute inset-0 left-[40px] top-[-50px] flex">
        <div className="flex h-[170px] w-[170px] items-center justify-center rounded-full bg-green-700 text-lg font-bold text-white shadow-lg">
          <p className="w-20 text-center text-[25px]">Sobre Nosotros</p>
        </div>
      </div>
    </section>
  );
}
