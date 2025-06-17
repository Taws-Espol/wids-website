import React from 'react';

export default function SobreNosotros({ circleText, bgImage }) {
  return (
    <section
      className="relative h-[400px] w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Círculo con el texto dinámico "Sobre Nosotros" */}
      <div className="absolute inset-0 left-[40px] top-[-50px] flex">
        <div className="flex h-[170px] w-[170px] items-center justify-center rounded-full bg-green-700 text-lg font-bold text-white shadow-lg">
          <p className="w-20 text-center text-[25px]">{circleText}</p>
        </div>
      </div>
    </section>
  );
}
