/* eslint-disable react/prop-types */
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
export function ItemTimeLine({ Evento }) {
  const imagenConferencista =
    '/assets/Eventos/Ediciones/2024/Images/conferencistas/' + Evento.image;
  let imagen = '';
  let background_color = '';
  let value = Evento.color;
  switch (value) {
    case 'verde':
      imagen = '/assets/images-cardInfo/Conferencia.webp';
      background_color = '#4ab969';
      break;
    case 'morado':
      imagen = '/assets/images-cardInfo/Break.webp';
      background_color = '#a2a2ff';
      break;
    case 'celeste':
      imagen = '/assets/images-cardInfo/Conferencia.webp';
      background_color = '#00a7d5';
      break;
    default:
      imagen = '/assets/images-cardInfo/Conferencia.webp';
      background_color = '#a2a2ff';
  }
  const timeAlignmentClass =
    Evento.index % 2 === 0
      ? 'justify-start min-[1170px]:justify-end'
      : 'justify-start';
  const title = Evento.title;
  let titleFirstPart = title;
  let titleSecondPart = '';
  if (title.includes(':')) {
    const splitTitle = title.split(':');
    if (splitTitle[0].length > 8) {
      titleFirstPart = splitTitle[0];
      titleSecondPart = splitTitle[1];
    }
  }

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentArrowStyle={{
        borderRight: `10px solid ${background_color}`,
      }}
      contentStyle={{ borderTop: ` 10px solid ${background_color}` }}
      iconStyle={{ background: `${background_color}`, color: '#fff' }}
      date={Evento.date}
      dateClassName="vertical-timeline-element-date"
    >
      <div className="flex h-full flex-col justify-between">
        {!Evento.date && (
          <div
            className={`flex flex-row items-center pb-5 ${timeAlignmentClass}`}
          >
            <img
              src="/assets/Eventos/Datathon/reloj.webp"
              alt="Logo"
              className="mr-2 h-8 w-8"
            />
            <p className="!m-0 !text-2xl">{Evento.time}</p>
          </div>
        )}
        <div>
          {Evento.info ? (
            <>
              {titleSecondPart ? (
                <>
                  <h3
                    className={`vertical-timeline-element-title text-center text-[1.7em] font-bold text-primary-dark-green`}
                  >
                    {titleFirstPart + ':'}
                  </h3>
                  <h3
                    className={`vertical-timeline-element-title text-center text-[1.7em] font-bold text-primary-dark-green`}
                  >
                    {titleSecondPart}
                  </h3>
                </>
              ) : (
                <h3
                  className={`vertical-timeline-element-title text-center text-[1.7em] font-bold text-primary-dark-green`}
                >
                  {title}
                </h3>
              )}
              {Array.isArray(Evento.info) ? (
                Evento.info.map((infoItem, index) => (
                  <p key={index} className="!text-lg">
                    {infoItem}
                  </p>
                ))
              ) : (
                <div className="mt-4 h-[22em]">
                  <div className="flex items-center justify-center p-4">
                    <img
                      src={imagenConferencista}
                      alt="conferencista"
                      className="h-[12rem] w-[12rem] rounded-full object-cover"
                    />
                  </div>
                  <div className="h-100% flex flex-col items-center">
                    <p className="!text-2xl !font-bold">{Evento.info}</p>
                    <p className="!mt-3 text-center !text-xl">{Evento.work}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <h1
              className={`text-2xl font-bold ${value == 'Break' ? 'text-primary-violet' : 'text-primary-dark-green'}`}
            >
              {Evento.title}
            </h1>
          )}
        </div>
        {Evento.date && (
          <div
            className={`flex flex-row items-center pt-5 ${timeAlignmentClass}`}
          >
            <img
              src="/assets/Eventos/Datathon/reloj.webp"
              alt="Logo"
              className="mr-2 h-8 w-8"
            />
            <p className="!m-0 !text-2xl">{Evento.time}</p>
          </div>
        )}
      </div>
    </VerticalTimelineElement>
  );
}
