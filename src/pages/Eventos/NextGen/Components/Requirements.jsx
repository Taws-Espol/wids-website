import React from 'react';

// Puedes modificar, añadir o eliminar elementos en este arreglo.
const requirementsList = [
  {
    id: 1,
    text: 'Jóvenes que estén cursando bachillerato',
  },
  {
    id: 2,
    text: 'Tener un profesor encargado de acompañar a los asistentes',
  },
];

export default function Requirements() {
  return (
    <div className="mx-auto my-10 w-full max-w-3xl font-sans">
      {/* Contenedor de la lista de requisitos */}
      <div className="flex flex-col gap-y-6 pl-4">
        {requirementsList.map((requirement) => (
          // Contenedor para cada item de la lista (círculo + texto)
          <div key={requirement.id} className="flex items-center gap-x-5">
            {/* Círculo con el número */}
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-cyan-500">
              <span className="text-3xl font-light text-cyan-500">
                {requirement.id}
              </span>
            </div>

            {/* Texto del requisito */}
            <p className="text-xl text-gray-700">{requirement.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
