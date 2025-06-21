export default function ProgramSchedule({ events }) {
  // Datos de ejemplo para la demostración
  const sampleEvents = events || [
    {
      title: 'Taller 1',
      info: 'María Isabel Mera',
      work: 'Ph.H., Profesora e Investigadora de FIEC, ESPOL',
      time: '01:15 PM',
      color: 'morado',
      image: 'maria.jpg',
    },
    {
      title: 'Taller 2',
      info: 'María Isabel Mera',
      work: 'Ph.H., Profesora e Investigadora de FIEC, ESPOL',
      time: '01:15 PM',
      color: 'morado',
      image: 'maria.jpg',
    },
    {
      title: 'Taller 3',
      info: 'María Isabel Mera',
      work: 'Ph.H., Profesora e Investigadora de FIEC, ESPOL',
      time: '01:15 PM',
      color: 'morado',
      image: 'maria.jpg',
    },
  ];

  return (
    <div className="mt-[20px] min-h-screen space-y-3 bg-[#FAFAFA] md:space-y-4 lg:px-6">
      {sampleEvents.map((event, index) => (
        <div
          key={index}
          className="flex h-full flex-col items-center overflow-hidden bg-white md:flex-row"
        >
          <div
            className="h-[35px] w-full md:h-[100px] md:w-1/3"
            style={{
              backgroundColor: getBackgroundColor(event.color),
            }}
          >
            <h3
              className="mx-3 flex h-full items-center font-barlow text-xs font-semibold leading-tight md:text-lg"
              style={{ color: '#004129' }}
            >
              {event.title}
            </h3>
          </div>

          <div className="flex w-full flex-row px-3 md:w-2/3 md:pl-4">
            <div className="flex flex-1 items-center bg-white py-2">
              <div className="mr-2 h-8 w-8 flex-shrink-0 md:mr-3 md:h-16 md:w-16">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
                  <span className="text-xs text-gray-500 md:text-sm">👤</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-barlow text-sm font-semibold text-gray-900 md:text-2xl">
                  {event.info}
                </h3>
                <p className="text-xs text-gray-600 md:text-lg">{event.work}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="rounded-2xl bg-green-950 px-3 py-1 md:px-4 md:py-1">
                <p className="font-sans text-xs font-light text-white md:text-lg">
                  {event.time}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function getBackgroundColor(color) {
  switch (color) {
    case 'verde':
      return '#95E6AC'; // Verde claro
    case 'morado':
      return '#a78bfa'; // Morado
    case 'celeste':
      return '#A1DBE4'; // Celeste
    case 'amarillo':
      return '#FFEA95'; // Amarillo
    case 'rosa':
      return '#FFCCB1'; // Rosa
    default:
      return '#a78bfa'; // Morado por defecto
  }
}
