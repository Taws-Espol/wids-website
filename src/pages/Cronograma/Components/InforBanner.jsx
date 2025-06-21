import React from 'react';

export default function InfoBanner() {
  return (
    <section className="flex flex-col items-center bg-white px-4 xl:mb-[-60px] xl:flex-row">
      {/* Círculo con el título "Programa" */}
      <div className="mb-6 flex w-full items-center justify-center rounded-full bg-teal-500 py-4 text-[40px] text-xl font-semibold text-white xl:h-40 xl:w-40 xl:py-0">
        AGENDA
      </div>

      {/* Descripción debajo del círculo */}
      <p className="max-w-4xl px-8 text-start text-lg text-gray-700">
        Consulta el cronograma de presentaciones y acompáñanos en una jornada de
        conocimiento e inspiración en torno a la ciencia de datos, innovación y
        transformación digital.
      </p>
    </section>
  );
}
