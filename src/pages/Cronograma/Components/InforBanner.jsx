import React from 'react';

export default function InfoBanner() {
  return (
    <section className="mt-[-60px] flex items-center bg-white px-4 py-12">
      {/* Círculo con el título "Programa" */}
      <div className="mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-teal-500 text-xl font-semibold text-white">
        Programa
      </div>

      {/* Descripción debajo del círculo */}
      <p className="max-w-4xl px-8 text-center text-start text-lg text-gray-700">
        Consulta el cronograma de presentaciones y acompáñanos en una jornada de
        conocimiento e inspiración en torno a la ciencia de datos, innovación y
        transformación digital.
      </p>
    </section>
  );
}
