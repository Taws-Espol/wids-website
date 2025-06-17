import React from 'react';

export default function ProgramSchedule({ events }) {
  return (
    <div className="mt-[-40px] min-h-screen space-y-4 px-6">
      {events.map((event, index) => (
        <div
          key={index}
          className="flex items-center overflow-hidden rounded-lg bg-white shadow-lg"
        >
          {/* Sección del título con fondo de color */}
          <div
            className="flex h-20 w-64 items-center p-4"
            style={{
              backgroundColor: getBackgroundColor(event.color),
            }}
          >
            <h3 className="text-sm font-semibold leading-tight text-gray-800">
              {event.title}
            </h3>
          </div>

          {/* Sección del conferencista con fondo blanco */}
          <div className="flex flex-1 items-center bg-white px-6 py-4">
            <div className="mr-4 h-12 w-12 flex-shrink-0">
              <img
                src={`/assets/Eventos/Ediciones/2024/Images/conferencistas/${event.image}`}
                alt={event.info}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900">
                {event.info}
              </h3>
              <p className="text-sm text-gray-600">{event.work}</p>
            </div>
          </div>

          {/* Sección de la hora con fondo verde oscuro */}
          <div className="flex h-20 items-center bg-green-800 px-6 py-4">
            <p className="text-base font-bold text-white">{event.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function getBackgroundColor(color) {
  switch (color) {
    case 'verde':
      return '#4ade80'; // Verde claro
    case 'morado':
      return '#a78bfa'; // Morado
    case 'celeste':
      return '#60a5fa'; // Celeste
    case 'amarillo':
      return '#fbbf24'; // Amarillo
    case 'rosa':
      return '#f9a8d4'; // Rosa
    default:
      return '#a78bfa'; // Morado por defecto
  }
}
