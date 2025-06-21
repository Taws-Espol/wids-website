import React from 'react';

// Función para obtener el código hexadecimal del color para los bordes
function getHexColor(color) {
  switch (color) {
    case 'verde':
      return '#95E6AC';
    case 'morado':
      return '#a78bfa';
    case 'celeste':
      return '#19c2ee';
    case 'amarillo':
      return '#FFEA95';
    case 'rosa':
      return '#FFCCB1';
    default:
      return '#E5E7EB';
  }
}

// Componente para un evento genérico o de sesión única - CENTRADO
const GenericEvent = ({ event }) => (
  <div className="border-b border-gray-300 py-8">
    <div className="flex justify-center">
      <div className="max-w-4xl text-center">
        <div className="mb-4 flex items-center justify-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <div className="px-6">
            <span className="mr-4 text-2xl font-bold text-gray-900">
              {event.time}
            </span>
            <span className="text-2xl font-bold text-green-500">
              {event.title}
            </span>
          </div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        {event.description && (
          <div className="mt-4 space-y-2 text-lg text-gray-700">
            {event.description.map((item, i) => (
              <div key={i} className="leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        )}
        {event.speaker && (
          <p className="mt-2 text-lg font-medium text-gray-900">
            {event.speaker}
          </p>
        )}
        {event.work && <p className="text-lg text-gray-600">{event.work}</p>}
      </div>
    </div>
  </div>
);

// Componente para una sesión dividida en dos salas (Room A/B)
const RoomSessionEvent = ({ event }) => (
  <div className="border-b border-gray-300">
    {/* Headers para Room A y Room B */}
    <div className="flex justify-center border-b border-gray-200 bg-gray-50">
      <div className="flex w-full max-w-6xl">
        <div className="flex-1 border-r border-gray-200 px-8 py-6 text-center">
          <h4 className="text-2xl font-bold text-green-500">Room A</h4>
        </div>
        <div className="flex-1 px-8 py-6 text-center">
          <h4 className="text-2xl font-bold text-green-500">Room B</h4>
        </div>
      </div>
    </div>

    {/* Contenido de las salas */}
    <div className="py-8">
      <div className="flex justify-center">
        <div className="flex w-full max-w-6xl gap-8">
          {/* Room A Content */}
          <div className="flex-1 text-left">
            <div className="mb-4">
              <span className="text-2xl font-bold text-gray-900">
                {event.time}
              </span>
            </div>
            <h3 className="mb-4 text-xl font-medium leading-tight text-[#19c2ee]">
              {event.roomA.title}
            </h3>
            {event.roomA.speaker && (
              <p className="text-lg font-medium text-gray-900">
                {event.roomA.speaker}
              </p>
            )}
            {event.roomA.work && (
              <p className="mt-1 text-lg text-gray-600">{event.roomA.work}</p>
            )}
          </div>

          {/* Room B Content */}
          <div className="flex-1 border-l border-gray-200 pl-8 text-left">
            <div className="mb-4">
              <span className="text-2xl font-bold text-gray-900">
                {event.time}
              </span>
            </div>
            <h3 className="mb-4 text-xl font-medium leading-tight text-[#19c2ee]">
              {event.roomB.title}
            </h3>
            {event.roomB.speaker && (
              <p className="text-lg font-medium text-gray-900">
                {event.roomB.speaker}
              </p>
            )}
            {event.roomB.work && (
              <p className="mt-1 text-lg text-gray-600">{event.roomB.work}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Componente para Descansos o Fin de Sesión
const BreakEvent = ({ event }) => (
  <div className="border-b border-gray-300 py-8">
    <div className="flex justify-center">
      <div className="max-w-4xl text-center">
        <div className="flex items-center justify-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <div className="px-6">
            <span className="mr-4 text-2xl font-bold text-gray-900">
              {event.time}
            </span>
            <span className="text-2xl font-bold text-green-500">
              {event.title}
            </span>
          </div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
      </div>
    </div>
  </div>
);

// Componente para eventos de speaker individual
const SpeakerEvent = ({ event }) => (
  <div className="border-b border-gray-300 py-8">
    <div className="flex justify-center">
      <div className="max-w-4xl text-center">
        <div className="mb-4 flex items-center justify-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <div className="px-6">
            <span className="mr-4 text-2xl font-bold text-gray-900">
              {event.time}
            </span>
            <span className="text-2xl font-bold text-green-500">
              {event.title}
            </span>
          </div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        {event.speaker && (
          <p className="mt-2 text-lg font-medium text-gray-900">
            {event.speaker}
          </p>
        )}
        {event.work && (
          <p className="mt-1 text-lg text-gray-600">{event.work}</p>
        )}
      </div>
    </div>
  </div>
);

// Componente para closing remarks
const ClosingRemarksEvent = ({ event }) => (
  <div className="border-b border-gray-300 py-8">
    <div className="flex justify-center">
      <div className="max-w-4xl text-center">
        <div className="mb-4 flex items-center justify-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <div className="px-6">
            <span className="mr-4 text-2xl font-bold text-gray-900">
              {event.time}
            </span>
            <span className="text-2xl font-bold text-green-500">
              {event.title}
            </span>
          </div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        {event.points && (
          <div className="mt-4 space-y-2 text-lg text-[#19c2ee]">
            {event.points.map((point, i) => (
              <div key={i} className="leading-relaxed">
                {point}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// Componente principal que renderiza la agenda completa
export default function ProgramScheduleV2({ events }) {
  // Datos de ejemplo usando la estructura proporcionada
  const agendaEvents = [
    {
      type: 'header',
      time: '8:00',
      title: 'Participant Registration',
      color: 'default',
    },
    {
      type: 'header',
      time: '9:00',
      title: 'Welcome & Opening Remarks',
      description: [
        '• Introduction to WiDS (Women in Data Science)',
        '• Why are we hosting this event?',
        '• Sponsor presentations:',
        '  o The North Highland',
        '  o Banco Guayaquil',
        '  o Coding Bootcamps',
        '• Organized by:',
        '  o TAWS',
        '  o Coding Bootcamps',
        '  o ESPOL',
      ],
      color: 'default',
    },
    {
      type: 'room_session',
      time: '09:20',
      roomA: {
        title:
          'Conectar datos, personas y estrategias: liderazgo femenino desde la inteligencia de negocios + Q&A',
        speaker: 'Kelly Carvajal',
        work: 'Head of Commercial Planning and Corporate Data Governance',
        image: 'KellyCarvajal.png',
        color: 'verde',
      },
      roomB: {
        title: 'Aplicaciones de IA Generativa en Marketing Digital + Q&A',
        speaker: 'Karen Calva',
        work: 'Head of Data Intelligence',
        image: 'KarenCalva.png',
        color: 'verde',
      },
    },
    {
      type: 'room_session',
      time: '09:40',
      roomA: {
        title:
          'Storytelling: Telling Stories Through Data - A Practical Case + Q&A',
        speaker: 'Estefanía Cisneros Freire',
        work: 'Head of Credit Data Analytics',
        image: 'EstefaniaCisnerosFreire.png',
        color: 'verde',
      },
      roomB: {
        title:
          'Más allá del código: cómo comunicar datos para influir, liderar y transformar- Q&A',
        speaker: 'Diana Once',
        work: 'IT Tools Specialist',
        image: 'DianaOnce.png',
        color: 'verde',
      },
    },
    {
      type: 'break',
      time: '10:00',
      title: 'Coffee Break',
    },
    {
      type: 'single_session',
      time: '10:30',
      title: 'More Than Models: The Art of Discovering Value in Data + Q&A',
      speaker: 'Iris Bustamante',
      work: 'Senior Data Scientist',
      image: 'IrisBustamante.png',
      color: 'verde',
    },
    {
      type: 'single_session',
      time: '10:50',
      title: 'Speaker Banco Guayaquil',
      color: 'verde',
    },
    {
      type: 'single_session',
      time: '11:10',
      title: 'Understanding the Customer Through Data + Q&A',
      speaker: 'Sofía España',
      work: 'Data Scientists at Xtrim',
      image: 'SofiaEspana.png',
      color: 'verde',
    },
    {
      type: 'single_session',
      time: '11:30',
      title:
        'From Chaos to Control: How to Use Data and Metrics to Anticipate Failures and Protect Your Business + Q&A',
      speaker: 'Vicky Valverde',
      work: 'Senior Full Stack Engineer',
      image: 'VickyValverde.png',
      color: 'verde',
    },
    {
      type: 'single_session',
      time: '11:50',
      title: 'From Excel to AI: A Journey into Data Transformation + Q&A',
      speaker: 'Nicole Agila',
      work: 'Senior Data Scientist',
      image: 'NicoleAgila.png',
      color: 'verde',
    },
    {
      type: 'closing_remarks',
      time: '12:10',
      title: 'Closing Remarks',
      points: [
        '• Acknowledgements to sponsors',
        '• Acknowledgements to speakers',
        '• Acknowledgements to collaborators',
        '• Acknowledgements to attendees',
      ],
    },
    {
      type: 'end_session',
      time: '12:30',
      title: 'End of Session',
    },
  ];

  const eventsToRender = events || agendaEvents;

  return (
    <div className="w-full bg-white">
      <div className="px-4 py-12">
        {eventsToRender.map((event, index) => {
          switch (event.type) {
            case 'room_session':
              return <RoomSessionEvent key={index} event={event} />;
            case 'break':
            case 'end_session':
              return <BreakEvent key={index} event={event} />;
            case 'single_session':
              return <SpeakerEvent key={index} event={event} />;
            case 'closing_remarks':
              return <ClosingRemarksEvent key={index} event={event} />;
            case 'header':
            default:
              return <GenericEvent key={index} event={event} />;
          }
        })}
      </div>
    </div>
  );
}
