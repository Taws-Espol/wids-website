import React, { useEffect, useState } from 'react';

// --- Sub-componente para cada tarjeta del contador ---
function CardTimer({ time, timeInfo, isLast = false }) {
  // Estilo condicional: verde si es la última caja, blanco en caso contrario.
  const boxStyle = isLast
    ? 'bg-green-600 text-white' // Verde para la última caja
    : 'bg-white text-black border border-gray-200';

  return (
    <div
      className={`flex h-24 w-24 select-none flex-col items-center justify-center rounded-lg shadow-lg ${boxStyle}`}
    >
      <p className="text-5xl font-bold leading-tight">{time}</p>
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
      <CardTimer time={timeLeft.weeks} timeInfo="Semanas" />
      <CardTimer time={timeLeft.days} timeInfo="Días" />
      <CardTimer time={timeLeft.hours} timeInfo="Horas" />
      <CardTimer time={timeLeft.seconds} timeInfo="Seg" isLast={true} />
    </div>
  );
}

// --- Componente de demostración ---
function App() {
  // Fecha del evento: 19 de julio de 2025
  const eventDate = '2025-07-19T00:00:00';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Countdown al 19 de Julio
        </h1>
        <Timer Event_date={eventDate} />
        <p className="mt-6 text-gray-600">
          Fecha del evento: 19 de julio de 2025
        </p>
      </div>
    </div>
  );
}

export default App;
