import React, { useEffect, useState } from 'react';
import '../../../index.css'; // Asegúrate que la ruta sea correcta

// --- Sub-componente para cada tarjeta del contador ---
function CardTimer({ time, timeInfo, isLast = false }) {
  // --- CAMBIO PRINCIPAL ---
  // Se ha eliminado la línea que añadía el cero inicial.
  // const formattedTime = String(time).padStart(2, '0'); // <-- ESTA LÍNEA FUE ELIMINADA

  // Estilo condicional: verde si es la última caja, blanco en caso contrario.
  const boxStyle = isLast
    ? 'bg-primary-dark-green text-white' // Reemplaza 'bg-primary-dark-green' si tu color se llama diferente
    : 'bg-white text-black border border-gray-200';

  return (
    <div
      className={`flex h-24 w-24 select-none flex-col items-center justify-center rounded-lg shadow-lg ${boxStyle}`}
    >
      <p className="text-5xl font-bold leading-tight">
        {/* Ahora se muestra el número directamente, sin formato */}
        {time}
      </p>
      {/* El mt-[-0.5rem] ayuda a juntar el texto con el número, como en la imagen */}
      <p className="mt-[-0.5rem] text-sm font-semibold uppercase tracking-wide">
        {timeInfo}
      </p>
    </div>
  );
}

// --- Componente Principal del Temporizador ---
export function Timer({ Event_date }) {
  const initialState = { weeks: 0, days: 0, hours: 0, seconds: 0 };
  const [timeLeft, setTimeLeft] = useState(initialState);

  useEffect(() => {
    if (!Event_date) {
      setTimeLeft(initialState);
      return;
    }

    const intervalId = setInterval(() => {
      const targetDate = new Date(Event_date);
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(intervalId);
        setTimeLeft(initialState);
      } else {
        const weeks = Math.floor(difference / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 7);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ weeks, days, hours, seconds });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [Event_date]);

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      {/* CAMBIO: Etiquetas actualizadas a español */}
      <CardTimer time={timeLeft.weeks} timeInfo="Semanas" />
      <CardTimer time={timeLeft.days} timeInfo="Días" />
      <CardTimer time={timeLeft.hours} timeInfo="Hora" />
      <CardTimer time={timeLeft.seconds} timeInfo="Seg" isLast={true} />
    </div>
  );
}
