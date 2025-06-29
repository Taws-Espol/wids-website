import React, { useState, useEffect } from 'react';

// Componente para un taller individual
const TallerEvent = ({ taller }) => (
  <div className="border-b border-gray-300 py-4 sm:py-8">
    <div className="flex justify-center">
      <div className="max-w-4xl text-center">
        <div className="mb-2 flex items-center justify-center sm:mb-4">
          <div className="hidden flex-1 border-t border-gray-300 sm:block"></div>
          <div className="px-2 sm:px-6">
            <span className="mr-2 text-lg font-bold text-gray-900 sm:mr-4 sm:text-2xl">
              {taller.time}
            </span>
            <span
              className="text-lg font-bold sm:text-2xl"
              style={{ color: '#19c2ee' }}
            >
              {taller.title}
            </span>
          </div>
          <div className="hidden flex-1 border-t border-gray-300 sm:block"></div>
        </div>

        {/* Información del facilitador */}
        {taller.info && (
          <p className="mt-1 text-base font-medium text-gray-900 sm:mt-2 sm:text-lg">
            {taller.info}
          </p>
        )}

        {/* Trabajo/Descripción */}
        {taller.work && (
          <p className="text-sm text-gray-600 sm:text-lg">{taller.work}</p>
        )}
      </div>
    </div>
  </div>
);

// Componente para descansos
const BreakEvent = ({ taller }) => (
  <div className="border-b border-gray-300 py-4 sm:py-8">
    <div className="flex justify-center">
      <div className="max-w-4xl text-center">
        <div className="flex items-center justify-center">
          <div className="hidden flex-1 border-t border-gray-300 sm:block"></div>
          <div className="px-2 sm:px-6">
            <span className="mr-2 text-lg font-bold text-gray-900 sm:mr-4 sm:text-2xl">
              {taller.time}
            </span>
            <span className="text-lg font-bold text-green-500 sm:text-2xl">
              Descanso
            </span>
          </div>
          <div className="hidden flex-1 border-t border-gray-300 sm:block"></div>
        </div>
      </div>
    </div>
  </div>
);

// Componente para talleres simultáneos (misma hora, diferentes días/rooms)
const SimultaneousTalleres = ({ talleres, time, eventType }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detectar cambios en el tamaño de la pantalla
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile(); // Verificar en el montaje inicial
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Determinar las etiquetas basadas en el tipo de evento y número de talleres
  const getLabels = () => {
    if (eventType === 'NextGen') {
      // Para NextGen, usar Room A, Room B, Room C, etc.
      return talleres.map(
        (_, index) => `Room ${String.fromCharCode(65 + index)}`,
      );
    } else {
      // Para Talleres, usar Día 1, Día 2, Día 3, etc.
      return talleres.map((_, index) => `Día ${index + 1}`);
    }
  };

  const labels = getLabels();
  const numCols = talleres.length;

  // Vista móvil - Apilada verticalmente
  if (isMobile) {
    return (
      <div className="border-b border-gray-300">
        <div className="py-4">
          <div className="mb-2 flex justify-center">
            <span className="text-xl font-bold text-gray-900">{time}</span>
          </div>

          {talleres.map((taller, index) => (
            <div
              key={`mobile-${taller.index}-${index}`}
              className="mb-6 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
            >
              <div className="mb-3 bg-gray-50 p-3 text-center">
                <h4 className="text-lg font-bold text-green-500">
                  {labels[index]}
                </h4>
              </div>

              <div className="px-3">
                {/* Título */}
                <h3 className="mb-2 text-lg font-medium text-[#19c2ee]">
                  {taller.title}
                </h3>

                {/* Información del facilitador */}
                {taller.info && (
                  <p className="mb-1 text-base font-medium text-gray-900">
                    {taller.info}
                  </p>
                )}

                {/* Trabajo/Descripción */}
                {taller.work && (
                  <p className="text-sm text-gray-600">{taller.work}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vista desktop - Grid con columnas
  return (
    <div className="border-b border-gray-300">
      {/* Headers dinámicos - Mejor alineación */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}
          >
            {labels.map((label, index) => (
              <div
                key={label}
                className={`flex min-h-[80px] items-center justify-center px-4 py-6 text-center ${
                  index < labels.length - 1 ? 'border-r border-gray-200' : ''
                }`}
              >
                <h4 className="text-lg font-bold text-green-500 sm:text-xl lg:text-2xl">
                  {label}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido de los talleres - Mejor alineación */}
      <div className="py-6 sm:py-8">
        <div className="mx-auto max-w-7xl">
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}
          >
            {talleres.map((taller, index) => (
              <div
                key={`${taller.index}-${index}`}
                className={`flex min-h-[200px] flex-col justify-start px-4 sm:px-6 lg:px-8 ${
                  index < talleres.length - 1 ? 'border-r border-gray-200' : ''
                }`}
              >
                {/* Hora */}
                <div className="mb-3 flex-shrink-0 sm:mb-4">
                  <span className="text-lg font-bold text-gray-900 sm:text-xl lg:text-2xl">
                    {time}
                  </span>
                </div>

                {/* Título */}
                <div className="mb-3 flex-shrink-0 sm:mb-4">
                  <h3 className="text-lg font-medium leading-tight text-[#19c2ee] sm:text-xl lg:text-xl">
                    {taller.title}
                  </h3>
                </div>

                {/* Información del facilitador */}
                {taller.info && (
                  <div className="mb-2 flex-shrink-0">
                    <p className="text-base font-medium text-gray-900 sm:text-lg">
                      {taller.info}
                    </p>
                  </div>
                )}

                {/* Trabajo/Descripción */}
                {taller.work && (
                  <div className="flex-grow">
                    <p className="text-sm leading-relaxed text-gray-600 sm:text-base lg:text-lg">
                      {taller.work}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal - modificado con márgenes para móvil
export default function ProgramScheduleV3({
  data = [],
  eventType = 'Talleres',
}) {
  // Función para normalizar el formato de hora
  const normalizeTime = (time) => {
    // Convertir "08:00 PM" a "8:00 PM" para consistencia
    return time.replace(/^0(\d)/, '$1');
  };

  // Usar datos apropiados basado en el tipo de evento
  const rawData = data.length > 0 ? data : [];

  // Normalizar las horas en todos los datos
  const talleres = rawData.map((taller) => ({
    ...taller,
    time: normalizeTime(taller.time),
  }));

  // Agrupar talleres por hora
  const tallersByTime = talleres.reduce((acc, taller) => {
    const time = taller.time;
    if (!acc[time]) {
      acc[time] = [];
    }
    acc[time].push(taller);
    return acc;
  }, {});

  return (
    <div className="w-full overflow-x-auto bg-white">
      <div className="min-w-full px-4 sm:px-0">
        {' '}
        {/* Añadido px-4 para móvil, sm:px-0 para quitar en pantallas más grandes */}
        {Object.entries(tallersByTime).map(([time, talleresEnHora]) => {
          // Si hay más de un taller a la misma hora, mostrarlos simultáneamente
          if (talleresEnHora.length > 1) {
            return (
              <SimultaneousTalleres
                key={time}
                talleres={talleresEnHora}
                time={time}
                eventType={eventType}
              />
            );
          } else {
            const taller = talleresEnHora[0];
            // Si es un break, usar el componente especial
            if (taller.type === 'Break') {
              return <BreakEvent key={taller.index} taller={taller} />;
            }
            // Sino, usar el componente normal de taller
            return <TallerEvent key={taller.index} taller={taller} />;
          }
        })}
      </div>
    </div>
  );
}
