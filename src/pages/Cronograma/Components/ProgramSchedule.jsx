export default function ProgramSchedule({ events }) {
  return (
    <div className="mt-[40px] min-h-screen space-y-6 bg-[#FAFAFA] md:space-y-7 lg:px-6">
      {events.map((event, index) => (
        <div
          key={index}
          className="flex h-full flex-col items-center overflow-hidden bg-white md:flex-row"
        >
          <div
            className="h-[52px] w-full md:h-[167px] md:w-1/3"
            style={{
              backgroundColor: getBackgroundColor(event.color),
            }}
          >
            <h3
              className="mx-4 flex h-full items-center font-barlow text-sm font-semibold leading-tight md:text-2xl"
              style={{ color: '#004129' }}
            >
              {event.title}
            </h3>
          </div>

          <div className="flex w-full flex-row px-4 md:w-2/3 md:pl-6">
            <div className="flex flex-1 items-center bg-white py-4">
              <div className="mr-2 h-11 w-11 flex-shrink-0 md:mr-4 md:h-28 md:w-28">
                <img
                  src={`/assets/Eventos/Ediciones/2024/Images/conferencistas/${event.image}`}
                  alt={event.info}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-barlow text-lg font-semibold text-gray-900 md:text-4xl">
                  {event.info}
                </h3>
                <p className="text-xs text-gray-600 md:text-2xl">
                  {event.work}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="rounded-3xl bg-green-950 px-6 py-1">
                <p className="font-sans text-xs font-light text-white md:text-3xl">
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
